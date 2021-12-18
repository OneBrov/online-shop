import React from 'react'
import { Button, Container, Row, Alert, Col, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Context } from '../..'
import { DeviceItem } from '../../components/DeviceItem'
import DeviceList from '../../components/DeviceList'
import { fetchOneDevice } from '../../http/deviceAPI'
import { fetchPurchases } from '../../http/purchaseAPI'

export const Purchases = () => {
    const history = useHistory()
    const {user, purchase} = React.useContext( Context )
    const [isLoading, setIsLoading] = React.useState(true)
    const [devices, setDevices] = React.useState([])

    const loadData = async () => {
        if (!user.isAuth){
            return setIsLoading(false)
        } 
        setIsLoading(false)
        const fetchedPurchase = await fetchPurchases()
        console.log(fetchedPurchase);
        purchase.setPurchase(fetchedPurchase)
        await Promise.all(
            purchase.purchases.map(async ({deviceId, id}, it) => {
                const device = await fetchOneDevice(deviceId)
                device.purchaseId = purchase.purchases[it].id
                device.isIssued = purchase.purchases[it].isIssued
                device.count = purchase.purchases[it].count
                setDevices(prev => [...prev, device])
            })
        )
        
        setDevices(prev => [...prev].sort((l, r) => r.purchaseId - l.purchaseId)  
        )
        setIsLoading(false)
    }

    React.useEffect(()=>{
        setDevices([])
        loadData()
    },[])

    return (
        <Container className="mt-5 ">
            <Row className="h-100 d-flex flex-column justify-content-center">
                <h2 className="text-center"> История покупок </h2>
            </Row>
            <Row>
                {!user.isAuth &&
                    <Alert variant="warning" className="text-center w-50 mx-auto">
                        Чтобы увидеть историю покупок, авторизируйтесь!
                    </Alert>
                }
                { isLoading 
                    ? <p>Идет загрузка</p>
                    :  devices.length 
                        ?   <Row> 
                                {devices.map((device, it) => 
                                    <Col key={it} md={9} className="m-auto mt-2">
                                        <div className="d-flex justify-content-between my-3" >
                                            <h5>Статус заказа: 
                                                <Alert  className="d-inline ms-2" variant={device.isIssued ? 'success' : 'warning'}>
                                                    {device.isIssued? ' Выдан' : ' Не выдан'}
                                                </Alert> 
                                            </h5>
                                            <div className="d-flex ">
                                                <h5 className="text-end">
                                                   Количество: <b>{device?.count} </b>
                                                </h5>
                                                <h5 className="text-end ms-5">
                                                    Код покупки: <b className="text-primary">{device?.purchaseId} </b>
                                                </h5>
                                            </div>

                                        </div>

            
                                        <DeviceItem  device={device}/>
                                    </Col>
                                )}
                            </Row>
                        :   <Row>
                                <p className="text-center"> Ваша история покупок пуста! Совершитее хотя бы одну, чтобы видеть вашу историю</p>
                                <Button className="m-auto" onClick={()=>history.push('/')} size="lg" variant="info" >
                                    Вернуться на главную 
                                </Button> 
                            </Row>
                }   
            </Row>
        </Container>
    )
}
