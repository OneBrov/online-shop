import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import TypeStore from './store/TypeStore';
import BrandStore from './store/BrandStore';
import CartStore from './store/CartStore';

import './index.scss'

export const Context = createContext(null)

ReactDOM.render(
  <>
    <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),
      type: new TypeStore(),
      brand: new BrandStore(),
      cart: new CartStore()
    }}>
      <App />
    </Context.Provider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
