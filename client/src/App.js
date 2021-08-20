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

const App = observer (() => {
  const {user, type, brand, device} = React.useContext(Context)
  const [loading, setLoading] = React.useState(true)
  React.useEffect( () =>{
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
      if (data.role === 'ADMIN') {
        user.setIsAdmin(true)
      }
    }).finally( () => setLoading(false))
      fetchTypes().then(data => type.setTypes(data))
      fetchBrands().then(data => brand.setBrands(data))
  } ,[]) 

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
