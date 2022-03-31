/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import ChartBlock from './ChartBlock';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import styles from '../css/ChartSection.module.css';
import { Button } from '@mui/material';

import Paho from 'paho-mqtt';


const data = [
	{
		name: "init",
		value: 0
	},
]

export default function () {
	const [tempData, setTempData] = useState(data)
	const [humidData, setHumidData] = useState(data)

	const updateTempNewValue = (newValue: number) => {
		const date = new Date()

		setTempData([...tempData, { name: `${date.getHours()}:${date.getMinutes()}`, value: newValue }])
	}

	const updateHumidNewValue = (newValue: number) => {
		const date = new Date()

		setHumidData([...humidData, { name: `${date.getHours()}:${date.getMinutes()}`, value: newValue }])
	}

	const AIO_FEED_IDS = ["bbc-tem", "bbc-hum", "bbc-relay", "bbc-relay1"]

	// Create a client instance
	var client = new Paho.Client("io.adafruit.com", Number(443), "4b2fb0d367e9dc77bcd2d21cc3889090");

	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;
	// connect the client
	client.connect({ userName: "lkangr", password: "aio_kqUW44UgGTalSxffXEWSEZHkQQXo", onSuccess: onConnect, useSSL: true });


	// called when the client connects
	function onConnect() {
		// Once a connection has been made, make a subscription and send a message.
		console.log("onConnect");
		AIO_FEED_IDS.forEach((id) => {
			client.subscribe("lkangr/feeds/" + id, { onSuccess: onSubscribe });
		})
	}

	function onSubscribe() {
		console.log("Subscribe success!");
	}

	// called when the client loses its connection
	function onConnectionLost(responseObject: any) {
		if (responseObject.errorCode !== 0) {
			console.log("onConnectionLost:" + responseObject.errorMessage);
		}
	}

	// called when a message arrives
	function onMessageArrived(message: any) {
		console.log("onMessageArrived:" + message.payloadString);
		console.log("feed: " + message.destinationName)
		if (message.destinationName === "lkangr/feeds/bbc-tem") {
			if (tempData[0].name === 'init') {
				const date = new Date()
				setTempData([{ name: `${date.getHours()}:${date.getMinutes()}`, value: Number(message.payloadString) },])
			}
			else {
				updateTempNewValue(Number(message.payloadString))
			}
		}
		else if (message.destinationName === "lkangr/feeds/bbc-hum") {
			if (humidData[0].name === 'init') {
				const date = new Date()
				setHumidData([{ name: `${date.getHours()}:${date.getMinutes()}`, value: Number(message.payloadString) },])
			}
			else {
				updateHumidNewValue(Number(message.payloadString))
			}
		}
	}

	const handlePump = () => {
		var message = new Paho.Message("1");
  		message.destinationName = "lkangr/feeds/bbc-relay";
  		client.send(message);
	}

	return <div>
		<p className={styles.heading}>BIỂU ĐỒ</p>

		<button onClick={handlePump}>Pump</button>

		<ChartBlock title="Humidity" data={humidData} />
		<ChartBlock title="Temperature" data={tempData} />
	</div>
}