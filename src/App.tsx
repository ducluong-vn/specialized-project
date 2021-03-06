import React from "react"
import styles from "./App.module.css"
import ChartSection from "./components/ChartSection"
import Header from "./components/Header"
import ScheduleSection from "./components/ScheduleSection"
import SwitchSection from "./components/SwitchSection"

function App() {
	return (
		<div className={styles.App}>
			<Header />

			<div className={styles.body}>
				<SwitchSection />	
				<ScheduleSection />
				<ChartSection />
			</div>
		</div>
	)
}

export default App
