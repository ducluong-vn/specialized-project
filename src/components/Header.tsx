import React from "react"
import { ReactComponent as HomeSVG } from "../svg/home.svg"

import styles from "../css/Header.module.css"

export default function () {
	return (
		<header className={styles.Header}>
			<span className={styles.gridMiddle}>
				<HomeSVG />
			</span>
			<span className={styles.gridLeft}>
				<a href="https://github.com/ducluong-vn/specialized-project">
					{/* <img src="./github.png" alt="github image" /> */}
				</a>
			</span>
		</header>
	)
}
