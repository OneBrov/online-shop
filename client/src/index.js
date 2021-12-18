import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import TypeStore from './store/TypeStore';
import BrandStore from './store/BrandStore';
import CartStore from './store/CartStore';
import './index.scss'
import PurchaseStore from './store/PurchaseStore';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),
      type: new TypeStore(),
      brand: new BrandStore(),
      cart: new CartStore(),
      purchase: new PurchaseStore()
    }}>
      <App />
    </Context.Provider>,
  document.getElementById('root')
);

