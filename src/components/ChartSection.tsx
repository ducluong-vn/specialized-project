import React from 'react'; 
import ChartBlock from './ChartBlock';

import styles from '../css/ChartSection.module.css';

const data = [
	{
		name: "A",
		value: 5
	},
	{
		name: "B",
		value: 1
	},
	{
		name: "C",
		value: 3
	},
	{
		name: "D",
		value: 4
	},
]

export default function() {
    return <div>
        <p className={styles.heading}>BIỂU ĐỒ</p>

		<ChartBlock title="Humidity" data={data} />
        <ChartBlock title="Temperature" data={data} /> 
    </div> 
}
