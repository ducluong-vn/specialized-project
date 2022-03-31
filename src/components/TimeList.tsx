import React, { useState } from 'react'; 

import styles from '../css/TimeList.module.css';
import AddTime from './AddTime';

interface ITimeItem {
    id: number
    hour: number
    minute: number
}

export default function(props: {
    title: string,
    feed_id: string,
    feed_value: string
}) {
    const [timeItems, setTimeItems] = useState<Array<ITimeItem>>([])
    
    return <div className={styles.container}>
        <p className={styles.title}>{props.title}</p>

        <div>
            {timeItems.map(item => (<p>{item.hour}</p>))}
            <AddTime /> 
        </div>
    </div>
}
