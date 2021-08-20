import {makeAutoObservable} from "mobx";
 
export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._isAdmin = false
        makeAutoObservable(this)
    }

    setIsAuth(val){
        this._isAuth=val
    }

    setIsAdmin(isAdmin){
        this._isAdmin=isAdmin
    }
    
    setUser(user){
        this._user=user
    }

    get isAuth() {
        return this._isAuth
    }

    get isAdmin() {
        return this._isAdmin
    }

    get user() {
        return this._user
    }

};
