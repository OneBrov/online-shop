import React, { useContext } from 'react'
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Context } from '../..'
import { fetchCart, removeFromCart } from '../../http/cartAPI'
import { observer } from 'mobx-react-lite'
import { fetchOneDevice } from '../../http/deviceAPI'
import { DeviceItem } from '../../components/DeviceItem'
import { addToPurchase } from '../../http/purchaseAPI'
import { SuccessMessage } from '../../components/modals/SuccessMessage'

const Cart = observer(() => {
    const history = useHistory()
    const {cart, user, device} = useContext(Context)
    const [isLoading, setIsLoading] = React.useState(true)
    const [devices, setDevices] = React.useState([])
    const [message, setMessage] = React.useState('')

    const [isSuccess, setIsSuccess] = React.useState(false)

    const loadData = async () => {
        if (!user.isAuth){
            return setIsLoading(false)
        } 
        setIsLoading(true)
        const newCart = await fetchCart()
        cart.setCart(newCart)
        await Promise.all(
            cart.cart.map(async ({deviceId}) => {
                const device = await fetchOneDevice(deviceId)
                setDevices(prev => [...prev, {...device, count: 1}])
            })
        )
        setIsLoading(false)
  
        
    }

    React.useEffect(()=>{
        setDevices([])
        loadData()
    },[])

    

    React.useEffect(()=>{
        const filteredDevices = devices.filter(cartDevice => 
            cart.cart.find(c => 
                c.deviceId===cartDevice.id    
            )
        )
        setDevices(filteredDevices)
    },[cart.cart])

    console.log(cart.cart);

    const handleCheckout = async () => {
        setMessage('')
        try {
            devices.forEach(device => {
                if (device.count <= 0) {
                    throw new Error('Количество устройств должно быть больше нуля!')
                }
            })
        } catch (e) {
            setMessage( e.message )
           return
        }
        
        try {
            await Promise.all(
                devices.map( device =>
                    addToPurchase(device.id, device.count)
                )
            )
        } catch (e) {
   
            setMessage( e.response?.data.message )
            return
        }

        await Promise.all(
            devices.map( device =>
                removeFromCart(device.id)
            )
        )
        setIsSuccess(true)
        setDevices([])
    }

    const handleCount = (id, value) => {
        setDevices(prev => 
            prev.map(device => 
                ({...device, ...(device.id === id && {count: value}) })
            )
        )
    }
    

    return (
        <Container className="mt-5">
            <Row className="h-100 d-flex flex-column justify-content-center">
                <h2 className="text-center"> Ваша корзина </h2>
            </Row>
            {!user.isAuth &&
                <Alert variant="warning" className="text-center w-50 mx-auto">
                    Чтобы увидеть содержимое корзины, авторизируйтесь!
                </Alert>
            }
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
                :   <Container fluid="sm"  className="d-flex flex-column justify-content-center" >
                        {devices.map(device => 
                            <Col key={device.id} md={9} className="m-auto">
                                <h4 className="text-end">
                                    Количество: 
                                    <Form.Control 
                                        value={device.count} 
                                        className=" d-inline text-center ms-2"
                                        style={{width: "70px"}}
                                        type="number"
                                        max={999}
                                        min={1}
                                        onChange={(e) => handleCount(device.id, e.target.value)}
                                    />
                                </h4>
                                <DeviceItem  device={device}/>
                            </Col>
                        )}
                        <Button 
                            size="lg w-25 mt-3 mx-auto"
                            onClick={handleCheckout} 
                        >
                            Оформить заказ
                        </Button>

                        {message.length > 0
                            && <Alert className="text-center mt-3" variant="warning">{message}</Alert>
                        }
                        <SuccessMessage show={isSuccess} onHide={()=>history.push('/')}/>
                    </Container>

                   
              
            }
        </Container>
    )
})

export default Cart
