import React from 'react';
import { Grid, Button } from "@mui/material"

import styles from '../css/ScheduleSection.module.css';

export default function () {

    const handleFeeding = () => {

    }

    const handleCleaning = () => {

    }

    const handleShower = () => {

    }

    return <div className={styles.container}>
        <p className={styles.heading}>CÔNG TẮC</p>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Button variant="outlined">CHO ĂN</Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="outlined">DỌN DẸP</Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="outlined">TẮM</Button>
            </Grid>
        </Grid>
    </div>
}