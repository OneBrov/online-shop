import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._devices = []
        this._typeId = null
        this._page = 1
        this._totalCount = 1
        this._limit = 5

        makeAutoObservable(this)
    }

    reset(){
        this._devices = []
        this._typeId = null
        this._page = 1
        this._totalCount = 1
        this._limit = 5
    }

    setPage(page){
        this._page = page
    }

    setTotalCount(totalCount){
        this._totalCount = totalCount
    }

    setLimit(limit){
        this._limit=limit
    }

    setTypeId(typeId){
        this._typeId=typeId
    }

    setDevices(devices){
        this._devices=devices
    }

    get devices() {
        return this._devices
    }

    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit(){
        return this._limit
    }

    get typeId() {
        return this._typeId
    }
};
