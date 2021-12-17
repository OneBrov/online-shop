import Admin from "./pages/Admin"
import Cart from "./pages/Cart"
import Main from "./pages/Main"
import Auth from "./pages/Auth"
import Device from "./pages/Device"

import {ADMIN_ROUTE, CART_ROUTE, CATALOG_ROUTE, CONTACTS_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, PURCHASES_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from './utils/consts'
import { Contacts } from "./pages/Contacts"
import { CatalogPage } from "./pages/CatalogPage"
import { Purchases } from "./pages/Purchases"

// pages, for only auth. users
export const authRoutes = [ 
    {
        path: ADMIN_ROUTE, 
        Component: Admin
    }
]  

// pages, for all users
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
    },

    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },

    {
        path: CATALOG_ROUTE + '/:id',
        Component: CatalogPage
    },

    {
        path: PURCHASES_ROUTE ,
        Component: Purchases
    },
    {
        path: CART_ROUTE,
        Component: Cart
    }

    
    
]  