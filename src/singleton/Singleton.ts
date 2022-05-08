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
        this.aioKey = "aio_wMAz49bN1TgdigYKjkfovjMUrSGc" //Nhấn 'My Key' trên trang chính của io.adafruit.com, copy trường Active Key
        this.username = "thanhvodev" //Nhấn 'My Key' trên trang chính của io.adafruit.com, copy trường Username
        this.feedIdRelay = "1939387" //Id của Feed Relay, chọn Feed Relay -> Chọn Feed Info -> Chọn Show detailed feed JSON record -> copy trường id
        this.feedKeyHum = "bbc-hum" // Key của feed lưu độ ẩm - có thể xem tại Feed Info hoặc nằm bên cạnh cột Feed Name trên trang 'view all feed'
        this.feedKeyTemp = "bbc-tem" // Key của feed lưu nhiệt độ
        this.feedKeyRelay = "bbc-relay" // Key của feed Relay
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
