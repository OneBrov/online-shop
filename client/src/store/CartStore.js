import {makeAutoObservable} from "mobx";
import { addToCart, fetchCart, removeFromCart } from "../http/cartAPI";
 
export default class CartStore {
    constructor() {
        this._cart = []
        makeAutoObservable(this)
    }

    setCart(cart){
        this._cart=cart
    }

    checkInCart(id) {
        return !!this._cart.find((item)=>item.deviceId === id)
    }

    async toggleItem(id) {
        if (!this.checkInCart(id)) {
            await addToCart(id)
        } else {
            await removeFromCart(id)
        }
        this.setCart(await fetchCart())
    }

    get cart() {
        return this._cart
    }
};