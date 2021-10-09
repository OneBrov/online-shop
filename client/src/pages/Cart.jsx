import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


const Cart = () => {
    const history = useHistory()
    return (
        <Container className="mt-5">
            <Row className="h-100 d-flex flex-column justify-content-center">
                <h2 className="text-center"> Ваша корзина </h2>


        
            </Row>
            <Row>
                <p className="text-center"> Ваша корзина пуста! Добавьте что-нибудь в вашу корзину, чтобы увидеть ее содержимое</p>
                    <Button className="w-25 m-auto" onClick={()=>history.push('/')} size="lg" variant="info" >
                        Вернуться к покупкам
                    </Button>
            </Row>
        </Container>
    )
}

export default Cart
