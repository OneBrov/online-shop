import React, { useContext } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useHistory } from 'react-router-dom'
import { DEVICE_ROUTE } from '../../utils/consts'

import Rating from 'react-rating'
import fullStar from '../../assets/fullStar.svg'
import emptyStar from '../../assets/emptyStar.svg'
import styles from './DeviceItem.module.scss'
import Image from 'react-bootstrap/esm/Image'
import { addToCart, fetchCart, removeFromCart } from '../../http/cartAPI'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import { rateDevice } from '../../http/deviceAPI'

export const DeviceItem = observer(({device}) => {

    const [inCart, setInCart] = React.useState(false)

    const history = useHistory()
    const {cart} = useContext(Context)
    
    React.useEffect(()=>{
       setInCart(cart.checkInCart(device.id))
    },[cart, cart.cart, device])

    const handleAddToCart = async (e) => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        cart.toggleItem(device.id)
    }


    const cancelBubble = (e) => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
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
                    <p className="fs-5 float-end mb-0" onClick={cancelBubble}>
                        <Rating 
                            readonly
                            initialRating={device.rating}
                            
                            fullSymbol={<img  src={fullStar} alt='Full star' />}
                            emptySymbol={<img src={emptyStar} alt='Empty Star' />}
                        /> 
                    </p>
                </div>
                <div onClick={(e)=> handleAddToCart(e)}>
                    <Button  
                        variant={inCart? "success": "info"}
                        className={styles.toCart}
                    >
                            <span> {inCart ? "Добавлено в корзину!" : "Добавить в корзину"}  </span>
                    </Button>
                </div>

            </div>
 
        </div>
    )
})
