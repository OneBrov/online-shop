import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useHistory } from 'react-router-dom'
import { DEVICE_ROUTE } from '../../utils/consts'
import { useRating } from '../../hooks/useRating'
import Rating from 'react-rating'
import fullStar from '../../assets/fullStar.svg'
import emptyStar from '../../assets/emptyStar.svg'
import styles from './DeviceItem.module.scss'
import Image from 'react-bootstrap/esm/Image'

const DeviceItem = ({device}) => {
    const history = useHistory()
    
    const handleAddToCart = (e) => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        console.log("added!");
    }

    const handleChangeRoute = (e) => {
        history.push(`${DEVICE_ROUTE}/${device.id}`)
    }

    return (
        <div 
        onClick={(e) => handleChangeRoute(e)} 
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
                    <p className="fs-5 float-end mb-0">
                        <Rating 
                            initialRating={device.rating} 
                            fullSymbol={<img  src={fullStar} alt='Full star' />}
                            emptySymbol={<img src={emptyStar} alt='Empty Star' />}
                        /> 
                    </p>
                </div>
                <div onClick={(e)=> handleAddToCart(e)}>
                    <Button  className={`${styles.toCart} mt-auto `}>
                            <span> Добавить в корзину </span>
                    </Button>
                </div>

            </div>
 
        </div>
    )
}

export default DeviceItem
