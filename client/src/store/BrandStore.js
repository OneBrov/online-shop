import {makeAutoObservable} from "mobx";
 
export default class BrandStore {
    constructor() {
        this._brands = [ 

        ]
        makeAutoObservable(this)
    }

    setBrands(brands){
        this._brands=brands
    }

    get brands() {
        return this._brands
    }
};