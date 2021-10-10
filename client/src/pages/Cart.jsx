import React, { useContext } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Context } from '..'
import { fetchCart } from '../http/cartAPI'
import { observer } from 'mobx-react-lite'
import { fetchOneDevice } from '../http/deviceAPI'
import DeviceItem from '../components/DeviceItem'

const Cart = observer(() => {
    const history = useHistory()
    const {cart} = useContext(Context)
    const [isLoading, setIsLoading] = React.useState(true)
    const [devices, setDevices] = React.useState([])

    const loadData = async () => {
        setIsLoading(true)
        const newCart = await fetchCart()
        cart.setCart(newCart)
        await Promise.all(
            cart.cart.map(async ({deviceId}) => {
                const device = await fetchOneDevice(deviceId)
                setDevices(prev => [...prev, device])
            })
        )
        setIsLoading(false)
        
    }

    React.useEffect(()=>{
        loadData()
    },[])
    


    return (
        <Container className="mt-5">
            <Row className="h-100 d-flex flex-column justify-content-center">
                <h2 className="text-center"> Ваша корзина </h2>
            </Row>
            {isLoading 
            ? <Row>
                    Идет загрузка...
                    
                </Row>
            : !cart.cart.length
                ?  <Row>
                        <p className="text-center"> Ваша корзина пуста! Добавьте что-нибудь в вашу корзину, чтобы увидеть ее содержимое</p>
                        <Button className="w-25 m-auto" onClick={()=>history.push('/')} size="lg" variant="info" >
                            Вернуться к покупкам
                        </Button>
                    </Row>
                : <Container fluid="sm"  className="d-flex flex-column justify-content-center" >
                        {devices.map(device=> 
                        <Col key={device.id} md={9} className="m-auto">
                            <DeviceItem  device={device}/>
                        </Col>
                        )}
                  
                </Container>
              
            }

        </Container>
    )
})

export default Cart
