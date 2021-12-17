import React from 'react'
import { Container, Row } from 'react-bootstrap'

export const Contacts = () => {
    return (
        <Container>
            <Row  className="mt-5">
                <h2 className="text-center">Контакты</h2>
            </Row>
            <Row className="mt-2">
                <p className="text-center ">
                    Для получения справочной информации, звоните по номеру <span className="fs-5"><b> +7 (777) 77-77-77  </b></span>  
                </p>
                
            </Row>
            <Row>
                <p className="text-center">
                    Наша почта  <span className="fs-5" ><b>nikogra@gmail.com </b></span>
                </p>
            </Row>
            <Row>
                <p className="text-center">
                    Команда разработчиков сайта "<b><i>Bruh team</i></b>"
                </p>
            </Row>
        </Container>
    )
}
