import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import CreateBrand from '../../components/modals/CreateBrand'
import CreateDevice from '../../components/modals/CreateDevice'
import CreateType from '../../components/modals/CreateType'

import styles from './Admin.module.scss'

function Admin() {
    const [brandVisible, setBrandVisible] = React.useState(false)
    const [deviceVisible, setDeviceVisible] = React.useState(false)
    const [typeVisible, setTypeVisible] = React.useState(false)
    return (
        <Container className="pt-5">
            <div className={`mx-auto d-flex w-50 flex-column align-items-center p-4 ${styles.back}`}>
                <h3>Панель администратора</h3>
                <Button 
                    className={`mt-3 w-100  ${styles.button}`} 
                    onClick={() => setDeviceVisible(true)}
                >
                    Добавить устройство
                </Button>
                <Button 
                    className={`mt-3 w-100  ${styles.button}`} 
                    onClick={() => setTypeVisible(true)}
                >
                    Добавить тип
                </Button>
                <Button  
                    className={`mt-3 w-100 ${styles.button}`} 
                    onClick={() => setBrandVisible(true)}
                >
                    Добавить бренд
                </Button>
                <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
                <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
                <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            </div>
        </Container>
    )
}

export default Admin

