import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Image from 'react-bootstrap/esm/Image'
import Button from 'react-bootstrap/esm/Button'

import styles from './Device.module.scss'
import { useRating } from '../../hooks/useRating'
import {useParams}  from 'react-router-dom'
import { fetchOneDevice } from '../../http/deviceAPI'

import Rating from 'react-rating'
import fullStar from '../../assets/fullStar.svg'
import emptyStar from '../../assets/emptyStar.svg'

const Device = () => {
    const [device, setDevice] = React.useState({info:[]})
    const {id} = useParams()
    React.useEffect(()=>{
        fetchOneDevice(id).then(data => setDevice(data))
    },[])



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
                            <h5> Рейтинг:
                                <span className={`${styles.rating} fs-5 ms-2`}> 
                                <Rating 
                                    initialRating={device?.rating} 
                                    fullSymbol={<img  src={fullStar} alt='Full star' />}
                                    emptySymbol={<img src={emptyStar} alt='Empty Star' />}
                                    />  
                                    {device.rating} 
                                </span> 
                            </h5>
                        </div>
                        <p className="fs-5 p-2 overflow-auto mt-2">{device.description }</p>
                        <div className="d-flex mt-auto align-items-end flex-column">
                            <p >Цена: <b className="ms-2">{device.price}  ₽</b></p>
                            <Button className={`${styles.toCart} mt-auto`}>
                                <span> Добавить в корзину </span>
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
}

export default Device
