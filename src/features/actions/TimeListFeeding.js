import React, { useState } from 'react';

import styles from '../../css/TimeList.module.css';
import { Grid } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'

import { feedingAdded, feedingRemoved, selectAllFeeding } from './feedingSlice'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Singleton from '../../singleton/Singleton'

export default function TimeListFeeding() {

    let singleton = Singleton.getInstance();

    const feedings = useSelector(selectAllFeeding)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)
    const [hour, setHour] = useState()
    const [minute, setMinute] = useState()

    const onHourChanged = (e) => setHour(e.target.value)
    const onMinuteChanged = (e) => setMinute(e.target.value)

    const onSavePostClicked = () => {
        if (hour && minute) {
            addAction()
            setHour('')
            setMinute('')
            setOpen(false);
        }
    }

    const removeItem = (id) => {
        if (id) {
            dispatch(feedingRemoved(id))
            deleteAction(id)
        }
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const theme = {
        spacing: 8,
    }

    //get all action
    const getAllAction = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: `https://io.adafruit.com/api/v2/${singleton.getusername()}/actions?x-aio-key=${singleton.getaioKey()}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                var datas = response.data
                datas.map(data => {
                    var sp = data.value.split(" ")
                    var id = data.id
                    var hour = sp[1]
                    var minute = sp[0]
                    dispatch(feedingAdded(id, hour, minute))
                })
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    React.useEffect(() => {
        getAllAction()
    }, [])

    //delete feed
    const deleteAction = (feedId) => {
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({

        });
        var config = {
            method: 'delete',
            url: `https://io.adafruit.com/api/v2/${singleton.getusername()}/actions/${feedId}?x-aio-key=${singleton.getaioKey()}`,
            headers: {},
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    //add action
    const addAction = () => {
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
            'action': 'feed',
            'action_feed_id': `${singleton.getfeedIdRelay()}`,
            'action_value': '1',
            'trigger_type': 'schedule',
            'value': `${minute} ${hour} * * *`
        });
        var config = {
            method: 'post',
            url: `https://io.adafruit.com/api/v2/${singleton.getusername()}/actions?x-aio-key=${singleton.getaioKey()}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                var data = response.data
                var sp = data.value.split(" ")
                var id = data.id
                var hour = sp[1]
                var minute = sp[0]
                dispatch(feedingAdded(id, hour, minute))
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return <div className={styles.container}>
        <p className={styles.title}>Cho Ăn</p>

        <Grid container spacing={2}>
            {feedings.map(item => (<Grid item xs={12} key={item.id}>
                {item.hour ? `${item.hour}:${item.minute}` : null}

                {item.hour ?
                    <Button variant="outlined" color="error" onClick={() => { removeItem(item.id) }} sx={{ m: 1 }}>
                        Xóa
                    </Button>
                    : null}

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
