import { observer } from 'mobx-react-lite';
import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { Context } from '../..';
import Catalog from '../../components/Catalog';
import DeviceList from '../../components/DeviceList';
import Pages from '../../components/Pages';
import { fetchCart } from '../../http/cartAPI';
import { fetchDevices } from '../../http/deviceAPI';


const Main = observer(() => {
    const {device, cart} = React.useContext(Context) 

    React.useEffect(() => {
        fetchCart().then(data => {
            cart.setCart(data)
        })
    }, [])

    React.useEffect(() => {
        fetchCart().then(data => {
            cart.setCart(data)
        })
        fetchDevices(device.page, device.limit).then(data =>{
            console.log( device.page, device.limit)
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
      
    }, [device, device.page, device.typeId])


    return (
            <Container>
            <Row>
                <Col md={4}>
                    <h4 >Категории товаров</h4>
                    <Catalog/>
                </Col>
                <Col md={8}>
                    <h4>Список всех товаров</h4>
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
})
    
    export default Main
    


