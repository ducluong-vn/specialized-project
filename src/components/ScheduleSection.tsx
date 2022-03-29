import React from "react"

import styles from "../css/ScheduleSection.module.css"
import Button from "@mui/material/Button"
import DialogTitle from "@mui/material/DialogTitle"
import TimeList from "./TimeList"

export default function () {
	return (
		<div className={styles.container}>
			<p className={styles.heading}>HẸN GIỜ</p>
			<TimeList />
		</div>
	)
}
