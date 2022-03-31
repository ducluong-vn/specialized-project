/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react"
import ChartBlock from "./ChartBlock"
import styles from "../css/ChartSection.module.css"

import Paho from "paho-mqtt"
import axios from "axios"

interface IData {
	name: string;
	value: number
}

export default function () {
	const [tempData, setTempData] = useState<Array<IData>>([])
	const [humidData, setHumidData] = useState<Array<IData>>([])
	
	useEffect(() => {
		axios
			.get(
				"https://io.adafruit.com/api/v2/trantrieuphi/feeds/bbc-hum/data?limit=10",
				{
					headers: {
						"x-aio-key": "aio_CIdO75vbLL2X0nzgWUpxqyxtN4dE",
					},
				}
			)
			.then((res) => {
				if (res.data) {

					const fetchedTemp = res.data.map(
						(temp: {
							created_at: string | number | Date
							value: string
						}) => {
							const date = new Date(temp.created_at)

							return {
								name: `${date.getHours()}:${date.getMinutes()}`,
								value: Number(temp.value),
							}
						}
					)
					
					setHumidData(fetchedTemp)
				}
			})
	}, [])

	useEffect(() => {
		axios
			.get(
				"https://io.adafruit.com/api/v2/trantrieuphi/feeds/bbc-temp/data?limit=10",
				{
					headers: {
						"x-aio-key": "aio_CIdO75vbLL2X0nzgWUpxqyxtN4dE",
					},
				}
			)
			.then((res) => {
				if (res.data) {

					const fetchedTemp = res.data.map(
						(temp: {
							created_at: string | number | Date
							value: string
						}) => {
							const date = new Date(temp.created_at)

							return {
								name: `${date.getHours()}:${date.getMinutes()}`,
								value: Number(temp.value),
							}
						}
					)
					
					setTempData(fetchedTemp)
				}
			})
	}, [])

	const updateTempNewValue = (newValue: number) => {
		const date = new Date()

		setTempData([
			...tempData,
			{
				name: `${date.getHours()}:${date.getMinutes()}`,
				value: newValue,
			},
		])
	}

	const updateHumidNewValue = (newValue: number) => {
		const date = new Date()

		setHumidData([
			...humidData,
			{
				name: `${date.getHours()}:${date.getMinutes()}`,
				value: newValue,
			},
		])
	}

	const AIO_FEED_IDS = ["bbc-temp", "bbc-hum"]

	// Create a client instance
	var client = new Paho.Client(
		"io.adafruit.com",
		Number(443),
		"4b2fb0d367e9dc77bcd2d21cc3889090"
	)

	// set callback handlers
	client.onConnectionLost = onConnectionLost
	client.onMessageArrived = onMessageArrived
	// connect the client
	client.connect({
		userName: "trantrieuphi",
		password: "aio_CIdO75vbLL2X0nzgWUpxqyxtN4dE",
		onSuccess: onConnect,
		useSSL: true,
	})

	// called when the client connects
	function onConnect() {
		// Once a connection has been made, make a subscription and send a message.
		console.log("onConnect")
		AIO_FEED_IDS.forEach((id) => {
			client.subscribe("trantrieuphi/feeds/" + id, { onSuccess: onSubscribe })
		})
	}

	function onSubscribe() {
		console.log("Subscribe success!")
	}

	// called when the client loses its connection
	function onConnectionLost(responseObject: any) {
		if (responseObject.errorCode !== 0) {
			console.log("onConnectionLost:" + responseObject.errorMessage)
		}
	}

	// called when a message arrives
	function onMessageArrived(message: any) {
		console.log("onMessageArrived:" + message.payloadString)
		console.log("feed: " + message.destinationName)
		if (message.destinationName === "trantrieuphi/feeds/bbc-temp") {
			updateTempNewValue(Number(message.payloadString))
		} else if (message.destinationName === "trantrieuphi/feeds/bbc-hum") {
			updateHumidNewValue(Number(message.payloadString))
		}
	}

	return (
		<div>
			<p className={styles.heading}>BIỂU ĐỒ</p>

			<ChartBlock title="Humidity" data={humidData} />
			<ChartBlock title="Temperature" data={tempData} />
		</div>
	)
}
