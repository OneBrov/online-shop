import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useHistory } from 'react-router-dom'
import { DEVICE_ROUTE } from '../../utils/consts'
import { useRating } from '../../hooks/useRating'

import styles from './DeviceItem.module.scss'
import Image from 'react-bootstrap/esm/Image'

const DeviceItem = ({device}) => {
    const history = useHistory()
    const rate = useRating(device.rating)
 
    return (
        <div 
        onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)} 
        className={`d-flex my-2 p-4 justify-content-between ${styles.device}`}>
            <Image 
                className="d-block" 
                height={160} 
                width={160}
                src={ process.env.REACT_APP_API_URL + device.img} 
                alt="Device"
            />
            <div className="ms-2 w-75"> 
                <h4> {device.name} </h4>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="mb-3 d-flex flex-column mb-0">
                    <p className="mb-0 float-end text-end">Цена:</p>
                    <p className="mb-0 fs-5 float-end text-end"><b>{device.price} ₽</b></p>
                </div>
                <div className="mb-0 d-flex flex-column align-items-end">
                    <p className="mb-0 float-end">Рейтинг:</p>
                    <p className="fs-5 float-end mb-0">{rate} </p>
                </div>
                <Button className={`${styles.toCart} mt-auto`}>
                        <span> Добавить в корзину </span>
                </Button>
            </div>
 
        </div>
    )
}

export default DeviceItem
