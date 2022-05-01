/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react"
import ChartBlock from "./ChartBlock"
import styles from "../css/ChartSection.module.css"

import Paho from "paho-mqtt"
import axios from "axios"
import Singleton from '../singleton/Singleton'

interface IData {
	name: string;
	value: number
}

export default function () {


	const [tempData, setTempData] = useState<Array<IData>>([])
	const [humidData, setHumidData] = useState<Array<IData>>([])
	let singleton = Singleton.getInstance();

	useEffect(() => {
		let singleton = Singleton.getInstance();

		if (singleton) {
			axios
				.get(
					`https://io.adafruit.com/api/v2/${singleton.getUsername()}/feeds/${singleton.getFeedKeyHum()}/data?limit=10`,
					{
						headers: {
							"x-aio-key": singleton.getAioKey(),
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
									name: `${date.getDate()}-${date.getMonth()}/${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
									value: Number(temp.value),
								}
							}
						)

						setHumidData(fetchedTemp.reverse())
					}
				})
		}

	}, [])

	useEffect(() => {
		axios
			.get(
				`https://io.adafruit.com/api/v2/${singleton.getUsername()}/feeds/${singleton.getFeedKeyTemp()}/data?limit=10`,
				{
					headers: {
						"x-aio-key": singleton.getAioKey(),
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
								name: `${date.getDate()}-${date.getMonth()}/${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
								value: Number(temp.value),
							}
						}
					)
					setTempData(fetchedTemp.reverse())
				}
			})
	}, [])

	const updateTempNewValue = (newValue: number) => {
		const date = new Date()

		if (newValue < 10) {
			alert("Cảnh báo! Nhiệt độ quá thấp")
		}

		if (newValue > 27) {
			alert("Cảnh báo! Nhiệt độ quá cao")
		}

		setTempData([
			...tempData,
			{
				name: `${date.getDate()} -${date.getMonth()} /${date.getHours()}:${date.getMinutes()}`,
				value: newValue,
			},
		])
	}

	const updateHumidNewValue = (newValue: number) => {
		const date = new Date()

		if (newValue < 5) {
			alert("Cảnh báo! Độ ẩm quá thấp")
		}

		setHumidData([
			...humidData,
			{
				name: `${date.getDate()}-${date.getMonth()}/${date.getHours()}:${date.getMinutes()}`,
				value: newValue,
			},
		])
	}

	const AIO_FEED_IDS = [singleton.getFeedKeyTemp(), singleton.getFeedKeyHum()]

	// Create a client instance
	var client = new Paho.Client(
		"io.adafruit.com",
		Number(443),
		"b"
	)

	// set callback handlers
	client.onConnectionLost = onConnectionLost
	client.onMessageArrived = onMessageArrived
	// connect the client
	client.connect({
		userName: singleton.getUsername(),
		password: singleton.getAioKey(),
		onSuccess: onConnect,
		useSSL: true,
	})

	// called when the client connects
	function onConnect() {
		// Once a connection has been made, make a subscription and send a message.
		console.log("onConnect")
		AIO_FEED_IDS.forEach((id) => {
			client.subscribe(`${singleton.getUsername()}/feeds/` + id, { onSuccess: onSubscribe })
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
		if (message.destinationName === `${singleton.getUsername()}/feeds/${singleton.getFeedKeyTemp()}`) {
			updateTempNewValue(Number(message.payloadString))
		} else if (message.destinationName === `${singleton.getUsername()}/feeds/${singleton.getFeedKeyHum()}`) {
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
