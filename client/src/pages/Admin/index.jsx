import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import CreateBrand from '../../components/modals/CreateBrand'
import CreateDevice from '../../components/modals/CreateDevice'
import CreateType from '../../components/modals/CreateType'
import { Delete } from '../../components/modals/Delete'
import { deleteBrand, fetchBrands } from '../../http/brandAPI'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import styles from './Admin.module.scss'

const Admin = observer(() => {
    const [brandVisible, setBrandVisible] = React.useState(false)
    const [brandDeleteVisible, setBrandDeleteVisible] = React.useState(false)
    const [deviceVisible, setDeviceVisible] = React.useState(false)
    const [typeVisible, setTypeVisible] = React.useState(false)

    const {brand} = React.useContext(Context)

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
                <hr />
                <Button  
                    variant="danger"
                    className={`mt-3 w-100 `} 
                    onClick={() => setBrandDeleteVisible(true)}
                >
                    Удалить бренд
                </Button>
                <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
                <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
                <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
                <Delete 
                    title="Бренд"
                    show={brandDeleteVisible} 
                    onHide={()=>setBrandDeleteVisible(false)} 
                    items={brand.brands}
                    deleteItem={(name)=> deleteBrand(name)}
                    afterDelete={async () => brand.setBrands(await fetchBrands())}
                />
      
            </div>
        </Container>
    )
})

export default Admin

