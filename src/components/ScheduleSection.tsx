import React from "react"

import styles from "../css/ScheduleSection.module.css"
import Button from "@mui/material/Button"
import DialogTitle from "@mui/material/DialogTitle"
import TimeList from "./TimeList"
import TimeListFeeding from "../features/actions/TimeListFeeding"
import TimeListCleaning from "../features/actions/TimeListCleaning"
import TimeListShower from "../features/actions/TimeListShower"
import { Grid } from "@mui/material"


export default function () {
	return (
		<div className={styles.container}>
			<p className={styles.heading}>HẸN GIỜ</p>

			<Grid container spacing={2}>
				<Grid item xs={4}>
					<TimeListFeeding />
				</Grid>
				<Grid item xs={4}>
					<TimeListCleaning title="Dọn dẹp" feed_id="1832730" feed_value="1" />
				</Grid>
				<Grid item xs={4}>
					<TimeListShower title="Tắm" feed_id="1832730" feed_value="1" />
				</Grid>
			</Grid>
		</div>
	)
}
