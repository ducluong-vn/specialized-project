import React from "react"

import styles from "../css/ScheduleSection.module.css"
import Button from "@mui/material/Button"
import DialogTitle from "@mui/material/DialogTitle"
import TimeList from "./TimeList"
import { Grid } from "@mui/material"


export default function () {
	return (
		<div className={styles.container}>
			<p className={styles.heading}>HẸN GIỜ</p>
			
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TimeList title="Cho ăn" feed_id="1832730" feed_value="1" />
				</Grid>			
				<Grid item xs={6}>
					<TimeList title="Đi tắm" feed_id="1838771" feed_value="1" />
				</Grid>			
			</Grid>
		</div>
	)
}
