import Admin from "./pages/Admin"
import Cart from "./pages/Cart"
import Main from "./pages/Main"
import Auth from "./pages/Auth"
import Device from "./pages/Device"

import {ADMIN_ROUTE, CART_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from './utils/consts'

export const authRoutes = [ 
    {
        path: ADMIN_ROUTE, 
        Component: Admin
    }, 
    {
        path: CART_ROUTE,
        Component: Cart
    }
]  // pages, for only auth. users

export const publicRoutes = [
    {
        path: SHOP_ROUTE, 
        Component: Main
    }, 

    {
        path: LOGIN_ROUTE,
        Component: Auth
    },

    {
        path: REGISTRATION_ROUTE, 
        Component: Auth
    },

    {
        path: DEVICE_ROUTE + '/:id',
        Component: Device
    }
    
]  // pages, for all users