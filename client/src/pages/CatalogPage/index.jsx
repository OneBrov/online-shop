import { observer } from 'mobx-react-lite';
import React from 'react'
import { Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Context } from '../..';
import DeviceList from '../../components/DeviceList';
import Pages from '../../components/Pages';
import { Settings } from '../../components/Settings';


export const CatalogPage = observer(() => {
    const { type, device } = React.useContext(Context)
    
    const [typeId, setTypeId] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)
    const { id } = useParams();
    React.useEffect(()=>{
        const t = type.types.find(t => t.name === id)
        if (t) {
            setTypeId(t.id)
        }

    },[type.types, id])

    React.useEffect(()=>{
        device.setDevices([])
    },[])



    return (
        <Container>
            <Row >
                <Col xs="4" >
                    {typeId && 
                        <Settings typeId={typeId} setLoading={setIsLoading} />
                    }
                    
                </Col>
                <Col xs="8" >
                    <h4>Устройства категории: {id} </h4>
                    {isLoading 
                        ? <Spinner animation="grow" />
                        : <> 
                            {device.devices.length > 0
                            ?<DeviceList />
                            : <Alert variant="warning">Товары в данной категории отсутсвуют!</Alert>
                            }
                            
                            <Pages />
                          </>
                    }

                </Col>
            </Row>
        </Container>
    )
})
