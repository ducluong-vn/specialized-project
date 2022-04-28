import React from 'react';
import { Grid, Button } from "@mui/material"
import Paho from "paho-mqtt"
import axios from "axios"
import styles from '../css/ScheduleSection.module.css';
import Singleton from '../singleton/Singleton'

export default function SwitchButton() {
    //adfruit identification

    let singleton = Singleton.getInstance();

    const AIO_FEED_IDS = [singleton.getFeedKeyRelay()]

    // Create a client instance
    var client = new Paho.Client(
        "io.adafruit.com",
        Number(443),
        singleton.getclientId()
    )

    // set callback handlers
    client.onConnectionLost = onConnectionLost
    client.onMessageArrived = onMessageArrived
    // connect the client
    client.connect({
        userName: singleton.getusername(),
        password: singleton.getaioKey(),
        onSuccess: onConnect,
        useSSL: true,
    })

    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect")
        AIO_FEED_IDS.forEach((id) => {
            client.subscribe(`${singleton.getusername()}/feeds/` + id, { onSuccess: onSubscribe })
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
        // if (message.destinationName === `${singleton.getusername()}/feeds/${singleton.getFeedKeyRelay()}`) {
        //     if (message.payloadString === "1") {

        //         document.getElementById("feeding").innerHTML = "ĐANG CHO ĂN"
        //         document.getElementById("feeding").style.color = "#b4b8bf"
        //         document.getElementById("feeding").style.border = "1px solid #b4b8bf"

        //         setTimeout(() => {
        //             handleTurnOffFeeding()
        //         }, [5000])
        //     } else {
        //         document.getElementById("feeding").innerHTML = "CHO ĂN"
        //         document.getElementById("feeding").style.color = "#1976d8"
        //         document.getElementById("feeding").style.border = "1px solid #1976d8"
        //     }
        // }
    }



    const handleFeeding = () => {
        var message = new Paho.Message("1");
        message.destinationName = `${singleton.getusername()}/feeds/${singleton.getFeedKeyRelay()}`;
        client.send(message);

    }

    const handleTurnOffFeeding = () => {
        var message = new Paho.Message("0");
        message.destinationName = `${singleton.getusername()}/feeds/${singleton.getFeedKeyRelay()}`;
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
                <Button variant="outlined" onClick={handleFeeding}>Dừng</Button>
                <Button variant="outlined" color="error" onClick={handleTurnOffFeeding}>Dừng</Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="outlined" onClick={handleFeeding}>DỌN DẸP</Button>
                <Button variant="outlined" color="error" onClick={handleTurnOffFeeding}>Dừng</Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="outlined" onClick={handleFeeding}>TẮM</Button>
                <Button variant="outlined" color="error" onClick={handleTurnOffFeeding}>Dừng</Button>
            </Grid>
        </Grid>
    </div>
}