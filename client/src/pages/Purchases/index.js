import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export const Purchases = () => {
    const history = useHistory()
    return (
        <Container className="mt-5">
            <Row className="h-100 d-flex flex-column justify-content-center">
                <h2 className="text-center"> История покупок </h2>


        
            </Row>
            <Row>
                <p className="text-center"> Ваша история покупок пуста! Совершитее хотя бы одну, чтобы видеть вашу историю</p>
                    <Button className="w-25 m-auto" onClick={()=>history.push('/')} size="lg" variant="info" >
                        Вернуться на главную 
                    </Button>
            </Row>
        </Container>
    )
}
