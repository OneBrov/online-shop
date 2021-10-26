import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Image from 'react-bootstrap/esm/Image'
import Button from 'react-bootstrap/esm/Button'

import styles from './Device.module.scss'

import {useParams}  from 'react-router-dom'
import { fetchOneDevice, rateDevice } from '../../http/deviceAPI'

import Rating from 'react-rating'
import fullStar from '../../assets/fullStar.svg'
import emptyStar from '../../assets/emptyStar.svg'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'


// add loading state
const Device = observer(() => {
    const [device, setDevice] = React.useState({info:[]})
    const [inCart, setInCart] = React.useState(false)
    const [rateMessage, setRateMessage] = React.useState(
        'Чтобы оценить устройство, просто кликните на одну из звезд!'
    )
    const {id} = useParams()
    const {cart} = React.useContext(Context)


    console.log(cart.cart);
    React.useEffect(()=>{
        fetchOneDevice(id).then(data => setDevice(data))
    },[])

    React.useEffect(()=>{
        if (device?.id) {
            setInCart(cart.checkInCart(device.id))
        }
     },[cart, cart.cart, device])

    const handleAddToCart = async (e) => {
        await cart.toggleItem(device.id)
    }


    const handleRate = async (value) => {
        setRateMessage('Устройство оценено!')
        //await rating set
        await rateDevice(device.id, value)
        // again fetching device for rerender rating
        fetchOneDevice(id).then(data => setDevice(data))
    }

    const renderRatingTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {rateMessage}
        </Tooltip>
      );


    return (
        <Container className="mt-5">
            <Row>
                <h1 className="ms-3"> <b>{device.name}</b> </h1>
            </Row>
            <Row>
                <Col className="mb-4" lg={4}>
                    <Image 
                        className={`m-auto d-block ${styles.rounded}`} 
                        width={300} height={300} 
                        src={device.img && (process.env.REACT_APP_API_URL + device.img)}  
                    />
                </Col>
                <Col  lg={8}>
                   
                    <div className={`p-4 ${styles.descriptionBox} d-flex flex-column`}>
                        <div className="d-flex justify-content-between align-items-end">
                            <h3> Описание </h3>
                            <OverlayTrigger
                                placement="top-end"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderRatingTooltip}
                            >
                            <h5> Рейтинг:
                                <span className={`${styles.rating} fs-5 ms-2`}> 

                                <Rating 
                                    initialRating={device?.rating} 
                                    fullSymbol={<img  src={fullStar} alt='Full star' />}
                                    emptySymbol={<img src={emptyStar} alt='Empty Star' />}
                                    onClick={handleRate}
                                    
                                    />  
                                    <span className="ms-1">
                                        {Number(device?.rating).toFixed(2)} 
                                    </span>
                                    
                                </span> 
                            </h5>
                            </OverlayTrigger>
                        </div>
                        <p className="fs-5 p-2 overflow-auto mt-2">{device.deviceDescription }</p>
                        <div className="d-flex mt-auto align-items-end flex-column">
                            <p >Цена: <b className="ms-2">{device.price}  ₽</b></p>
                            <Button 
                                onClick={handleAddToCart} 
                                variant={inCart? "success": "info"}
                                className={styles.toCart}
                            >
                            <span> {inCart ? "Добавлено в корзину!" : "Добавить в корзину"}  </span>
                    </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="px-2">
                <div className={`p-4 ${styles.descriptionBox} d-flex flex-column h-100`}>
                    <h3> Характеристики </h3>
                    {device.info.map( (info, id)=> 
                        <div key={id}>
                            <div className="d-flex ">
                                <div className={`fs-4 ${styles.descriptionName}`}>
                                    {info.title}
                                </div> 
                                <div className={`fs-4 ${styles.descriptionValue}`}>
                                    {info.description}
                                </div> 
                            </div>
                        </div>
                    )}
 

                </div>
            </Row>
        </Container>
    )
})

export default Device
