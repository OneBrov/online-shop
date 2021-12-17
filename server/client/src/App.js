import React from 'react'

import { observer } from "mobx-react-lite"
import { BrowserRouter } from "react-router-dom"
import { Context } from "."
import AppRouter from "./components/AppRouter"
import Navigation from "./components/Navigation"
import { check } from './http/userAPI'
import Spinner from 'react-bootstrap/esm/Spinner'
import { fetchTypes } from './http/typeAPI'
import { fetchBrands } from './http/brandAPI'
import { fetchDevices } from './http/deviceAPI'
import { fetchCart } from './http/cartAPI'

const App = observer (() => {
  const {user, type, brand, device, cart} = React.useContext(Context)
  const [loading, setLoading] = React.useState(true)
  
  const fetchDefault = async () => {
    try {
      const data  = await check()
      user.setUser(data)
      user.setIsAuth(true) 
      if (data.role === 'ADMIN') {
        user.setIsAdmin(true)
      }
    } catch (e) {
      user.setIsAuth(false)
    }
    await fetchData()
    setLoading(false)
  }

  const fetchData = async () => {
    await Promise.all([
      fetchTypes().then((data) => type.setTypes(data)),
      fetchBrands().then(data => brand.setBrands(data)),
      user.isAuth&&fetchCart().then((data)=> cart.setCart(data))
    ])
   
  }

  React.useEffect( () =>{
    // check().then(data => {
    //   user.setUser(data)
    //   user.setIsAuth(true) 
    //   if (data.role === 'ADMIN') {
    //     user.setIsAdmin(true)
    //   }
    // })
    
    setLoading(true)
    fetchDefault()
    // Promise.all([
    //   fetchTypes().then((data) => type.setTypes(data)),
    //   fetchBrands().then(data => brand.setBrands(data)),
    //   user.isAuth&&fetchCart().then((data)=> cart.setCart(data))
    // ]).then(setLoading(false))
      // fetchTypes().then((data) => type.setTypes(data))
      // fetchBrands().then(data => brand.setBrands(data))
      // if (user.isAuth) {
      //   fetchCart().then((data)=> cart.setCart(data))
      // }
 
  } , [user, type, brand, device, cart]) 

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <BrowserRouter >
      <Navigation />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
