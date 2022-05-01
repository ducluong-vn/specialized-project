import React from 'react';
import { Grid, Button } from "@mui/material"
import Paho from "paho-mqtt"
import axios from "axios"
import styles from '../css/ScheduleSection.module.css';
import Singleton from '../singleton/Singleton'

export default function SwitchButton() {
    //adfruit identification

    let singleton = Singleton.getInstance();
    const [on, setOn] = React.useState()

    React.useEffect(() => {
        let singleton = Singleton.getInstance();

        if (singleton) {
            axios
                .get(
                    `https://io.adafruit.com/api/v2/${singleton.getUsername()}/feeds/${singleton.getFeedKeyRelay()}/data?limit=1`,
                    {
                        headers: {
                            "x-aio-key": singleton.getAioKey(),
                        },
                    }
                )
                .then((res) => {
                    if (res.data) {
                        console.log(res.data)
                        setOn(res.data[0].value === "1")
                    }
                })
        }

    }, [])

    const AIO_FEED_IDS = [singleton.getFeedKeyRelay()]

    // Create a client instance
    var client = new Paho.Client(
        "io.adafruit.com",
        Number(443),
        "a"
    )

    // set callback handlers
    client.onConnectionLost = onConnectionLost
    client.onMessageArrived = onMessageArrived
    // connect the client
    client.connect({
        userName: singleton.getUsername(),
        password: singleton.getAioKey(),
        onSuccess: onConnect,
        useSSL: true,
    })

    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect")
        AIO_FEED_IDS.forEach((id) => {
            client.subscribe(`${singleton.getUsername()}/feeds/` + id, { onSuccess: onSubscribe })
        })
    }

    function onSubscribe() {
        console.log("Subscribe success!")
    }

    // called when the client loses its connection
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage)
        }
    }

    // called when a message arrives
    function onMessageArrived(message) {
        console.log("onMessageArrived:" + message.payloadString)
        console.log("feed: " + message.destinationName)
        if (message.destinationName === `${singleton.getUsername()}/feeds/${singleton.getFeedKeyRelay()}`) {
            if (message.payloadString === "1") {
                setOn(true)
            } else {
                setOn(false)
            }
        }
    }



    const handleFeeding = () => {
        var message = new Paho.Message("1");
        message.destinationName = `${singleton.getUsername()}/feeds/${singleton.getFeedKeyRelay()}`;
        client.send(message);

    }

    const handleTurnOffFeeding = () => {
        var message = new Paho.Message("0");
        message.destinationName = `${singleton.getUsername()}/feeds/${singleton.getFeedKeyRelay()}`;
        client.send(message);
    }

    const handleCleaning = () => {

    }

    const handleShower = () => {

    }

    return <div className={styles.container}>
        <p className={styles.heading}>CÔNG TẮC</p>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Button variant="outlined" onClick={handleFeeding} disabled={on}>CHO ĂN</Button>
                <Button variant="outlined" color="error" onClick={handleTurnOffFeeding} disabled={!on}>Dừng</Button>
                <p>Máy bơm hiện tại đang:<h3>{on ? "ON" : "OFF"}</h3></p>
            </Grid>
            <Grid item xs={3}>
                <Button variant="outlined" onClick={handleFeeding} disabled={on}>DỌN DẸP</Button>
                <Button variant="outlined" color="error" onClick={handleTurnOffFeeding} disabled={!on}>Dừng</Button>
                <p>Máy bơm hiện tại đang:<h3>{on ? "ON" : "OFF"}</h3></p>
            </Grid>
            <Grid item xs={3}>
                <Button variant="outlined" onClick={handleFeeding} disabled={on}>TẮM</Button>
                <Button variant="outlined" color="error" onClick={handleTurnOffFeeding} disabled={!on}>Dừng</Button>
                <p>Máy bơm hiện tại đang:<h3>{on ? "ON" : "OFF"}</h3></p>
            </Grid>
        </Grid>
    </div>
}