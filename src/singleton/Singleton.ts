import React from 'react'

export default class Singleton {
    static myInstance: Singleton;
    static flag: boolean = false;
    username: any;
    aioKey: string;
    feedIdRelay: string;
    feedKeyHum: string;
    feedKeyTemp: string;
    feedKeyRelay: string;

    constructor() {
        this.aioKey = "aio_sULz62rQiJGPum0Oqa6GoVUGHneB"
        this.username = "thanhvodev"
        this.feedIdRelay = "1939387"
        this.feedKeyHum = "bbc-hum"
        this.feedKeyTemp = "bbc-tem"
        this.feedKeyRelay = "bbc-relay"
    }
    static getInstance() {
        if (Singleton.flag === false) {
            Singleton.myInstance = new Singleton();
            Singleton.flag = true;
        }


        return this.myInstance;
    }


    getFeedKeyRelay() {
        return this.feedKeyRelay;
    }

    setFeedKeyRelay(feedKeyRelay: string) {
        this.feedKeyRelay = feedKeyRelay;
    }

    getAioKey(): string {
        return this.aioKey;
    }

    setAioKey(aioKey: string) {
        this.aioKey = aioKey;
    }

    getFeedIdRelay(): string {
        return this.feedIdRelay;
    }

    setFeedIdRelay(feedIdRelay: string) {
        this.feedIdRelay = feedIdRelay;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username: string) {
        this.username = username;
    }

    getFeedKeyHum() {
        return this.feedKeyHum;
    }

    setFeedKeyHum(feedKeyHum: string) {
        this.feedKeyHum = feedKeyHum;
    }

    getFeedKeyTemp() {
        return this.feedKeyTemp;
    }

    setFeedKeyTemp(feedKeyTemp: string) {
        this.feedKeyTemp = feedKeyTemp;
    }


    getMaxTempBetween(time1: any, time2: any) {

    }

    getMaxHumidBetween(time1: any, time2: any) {

    }

}
