import React, { useState } from 'react';

import styles from '../../css/TimeList.module.css';
import { Grid } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'

import { cleaningAdded, cleaningRemoved, selectAllCleaning } from './cleaningSlice'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function TimeListcleaning({ title, feed_id, feed_value }) {
    const cleanings = useSelector(selectAllCleaning)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)
    const [hour, setHour] = useState()
    const [minute, setMinute] = useState()

    const onHourChanged = (e) => setHour(e.target.value)
    const onMinuteChanged = (e) => setMinute(e.target.value)

    const onSavePostClicked = () => {
        if (hour && minute) {
            dispatch(cleaningAdded(hour, minute))
            setHour('')
            setMinute('')
            setOpen(false);
        }
    }

    const removeItem = (id) => {
        if (id) {
            dispatch(cleaningRemoved(id))
        }
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <div className={styles.container}>
        <p className={styles.title}>{title}</p>

        <Grid container spacing={2}>
            {cleanings.map(item => (<Grid item xs={12} key={item.id}>
                {item.hour}:{item.minute}
                <Button variant="outlined" color="error" onClick={() => { removeItem(item.id) }} sx={{ m: 1 }}>
                    Xóa
                </Button>
            </Grid>))}
        </Grid>
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm thời gian</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="hour"
                        label="Hour"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={onHourChanged}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="minute"
                        label="Minute"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={onMinuteChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSavePostClicked}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>

    </div>
}
