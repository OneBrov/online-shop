import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router';
export const CatalogPage = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <Container>
            {id}
            <Row >
                <Col xs="4" >
                    setts
                </Col>
                <Col xs="8" >
                    devices
                </Col>
            </Row>
        </Container>
    )
}
