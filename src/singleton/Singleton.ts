import React from 'react'

export default class Singleton {
    static myInstance: Singleton;
    static flag: boolean = false;
    username: any;
    aioKey: string;
    feedIdRelay: string;
    feedIdHum: string;
    feedIdTemp: string;
    feedKeyRelay: string;
    _userID: any;

    constructor() {
        this.aioKey = "aio_JBmI65a837B6dy8D4Et6XBshU6B9"
        this.username = "thanhvodev"
        this.feedIdRelay = "1939387" // chọn Feed Info -> chọn Show detailed feed JSON record
        this.feedIdHum = "bbc-hum"
        this.feedIdTemp = "bbc-tem"
        this.feedKeyRelay = "bbc-relay"
    }
    static getInstance() {
        if (Singleton.flag === false) {
            Singleton.myInstance = new Singleton();
            Singleton.flag = true;
        }


        return this.myInstance;
    }

    getUserID() {
        return this._userID;
    }

    getFeedKeyRelay() {
        return this.feedKeyRelay;
    }

    getaioKey(): string {
        return this.aioKey;
    }

    getfeedIdRelay(): string {
        return this.feedIdRelay;
    }

    getusername() {
        return this.username;
    }

    getfeedIdHum() {
        return this.feedIdHum;
    }

    getfeedIdTemp() {
        return this.feedIdTemp;
    }

    getMaxTempBetween(time1: any, time2: any) {

    }

    getMaxHumidBetween(time1: any, time2: any) {

    }

}
