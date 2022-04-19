import React from 'react'

export default class Singleton {
    static myInstance: Singleton;
    static flag: boolean = false;
    username: any;
    aioKey: string;
    feedIdRelay: string;
    feedIdHum: string;
    feedIdTemp: string;
    clientId: string;
    _userID: any;

    constructor() {
        this.aioKey = "aio_DJCn88Zd3GtwM3b0KP5QDHH2cYFd"
        this.username = "lkangr"
        this.feedIdRelay = "bbc-relay"
        this.feedIdHum = "bbc-hum"
        this.feedIdTemp = "bbc-tem"
        this.clientId = ""
    }
    static getInstance() {
        if (Singleton.flag == false) {
            Singleton.myInstance = new Singleton();
            Singleton.flag = true;
        }


        return this.myInstance;
    }

    getUserID() {
        return this._userID;
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

    getclientId() {
        return this.clientId;
    }

    setClientId(id: string) {
        this.clientId = id;
    }
}
