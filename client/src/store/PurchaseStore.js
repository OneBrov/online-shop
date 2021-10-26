import {makeAutoObservable} from "mobx";

export default class PurchaseStore {
    constructor() {
        this._purchase = []
        makeAutoObservable(this)
    }

    setPurchase(purchase){
        this._purchase=purchase
    }

    get purchases() {
        return this._purchase
    }
};