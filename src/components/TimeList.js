import React, { useState } from 'react';

import styles from '../css/TimeList.module.css';
import AddTime from './AddTime';
import { Grid } from "@mui/material"

export default function TimeList({ title, feed_id, feed_value }) {
    const [timeItems, setTimeItems] = useState([

        {
            id: 0,
            hour: 12,
            minute: 24
        },
        {
            id: 1,
            hour: 10,
            minute: 19
        },

    ])

    return <div className={styles.container}>
        <p className={styles.title}>{title}</p>

        <Grid container spacing={2}>
            {timeItems.map(item => (<Grid item xs={12}>{item.hour}:{item.minute}</Grid>))}
        </Grid>
        <AddTime />

    </div>
}
