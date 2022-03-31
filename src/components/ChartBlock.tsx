import React from "react"

import styles from "../css/ChartBlock.module.css"
import ChartBox from "./ChartBox"

interface IState {
	data: Array<{
		name: string
		value: number
	}>

	title: string
}

function LeftStats(props: { min: number; max: number; avg: number }) {
	return (
		<div className={styles.leftStats}>
			<div className={styles.info}>
				<p className={styles.infoTitle}>Max</p>
				<p>{props.max}</p>
			</div>
			<div className={styles.info}>
				<p className={styles.infoTitle}>Min</p>
				<p>{props.min}</p>
			</div>
			<div className={styles.info}>
				<p className={styles.infoTitle}>Average</p>
				<p>{props.avg}</p>
			</div>
		</div>
	)
}

function getMax(a: number, b: { name: string; value: number }) {
	return Math.max(a, b.value)
}

function getMin(a: number, b: { name: string; value: number }) {
	return Math.min(a, b.value)
}

function getSum(a: number, b: { name: string; value: number }) {
	return a + b.value
}

export default function (props: IState) {
	return (
		<div className={styles.container}>
			<p className={styles.title}>{props.title}</p>
			<ChartBox data={props.data} />

			{props.data.length > 0 && (
				<LeftStats
					max={props.data.reduce(getMax, props.data[0].value)}
					min={props.data.reduce(getMin, props.data[0].value)}
					avg={
						Math.round(
							(props.data.reduce(getSum, 0) /
								props.data.length) *
								100
						) / 100
					}
				/>
			)}
		</div>
	)
}
