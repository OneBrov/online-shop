import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { createBrand, deleteBrand, fetchBrands, updateBrand } from '../../http/brandAPI'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import styles from './Admin.module.scss'
import { createType, deleteType, fetchTypes, updateType } from '../../http/typeAPI'
import { createDevice, deleteDevice, fetchAllDevices, fetchDevices, updateDevice } from '../../http/deviceAPI'
import { Spinner } from 'react-bootstrap'
import { DeviceIssue } from '../../components/modals/DeviceIssue'
import { CreateBrand } from '../../components/modals/Crud/CreateBrand'
import { CreateDevice } from '../../components/modals/Crud/CreateDevice'
import { CreateType } from '../../components/modals/Crud/CreateType'

import { Delete } from '../../components/modals/Crud/Delete'

import { UpdateBrand } from '../../components/modals/Crud/UpdateBrand'
import { UpdateType } from '../../components/modals/Crud/UpdateType'
import { UpdateDevice } from '../../components/modals/Crud/UpdateDevice'

const Admin = observer(() => {
    
    const [isLoading, setIsLoading] = React.useState(true)
   
    //delete actions
    const [deviceDeleteVisible, setDeviceDeleteVisible] = React.useState(false)
    const [brandDeleteVisible, setBrandDeleteVisible] = React.useState(false)
    const [typeDeleteVisible, setTypeDeleteVisible] = React.useState(false)
   
    //update actions
    const [brandUpdateVisible, setBrandUpdateVisible] = React.useState(false)
    const [typeUpdateVisible, setTypeUpdateVisible] = React.useState(false)
    const [deviceUpdateVisible, setDeviceUpdateVisible] = React.useState(false)
    
    //creation actions
    const [brandVisible, setBrandVisible] = React.useState(false)
    const [deviceVisible, setDeviceVisible] = React.useState(false)
    const [typeVisible, setTypeVisible] = React.useState(false)

    const [deviceIssueVisible, setDeviceIssueVisible] = React.useState(false)

    const {brand, type, device} = React.useContext(Context)
    

    React.useEffect(()=>{
        const fetching = async () => {
            setIsLoading(true)
            device.setDevices((await fetchAllDevices()))
            type.setTypes(await fetchTypes())
            brand.setBrands(await fetchBrands())
            setIsLoading(false)
        }
        fetching()
    },[])
    console.log(device.devices);
    if (isLoading) return <Spinner />
    return (
        <Container className="pt-5"  >
            <div className={`mx-auto d-flex w-50 flex-column align-items-center p-4 ${styles.back}`}>
                <h3>Панель администратора</h3>
                    <Button  
                        variant="primary"
                        className={`mt-3 w-100 `} 
                        onClick={() => setDeviceIssueVisible(true)}
                    >
                        Выдача товаров 
                    </Button>

                <hr />

                    <Button 
                        variant="info"
                        className={`mt-3 w-100`} 
                        onClick={() => setDeviceVisible(true)}
                    >
                        Добавить устройство
                    </Button>
                    <Button 
                        variant="info"
                        className={`mt-3 w-100`}  
                        onClick={() => setTypeVisible(true)}
                    >
                        Добавить тип
                    </Button>
                    <Button  
                        variant="info"
                        className={`mt-3 w-100`}  
                        onClick={() => setBrandVisible(true)}
                    >
                        Добавить бренд
                    </Button>

                <hr/>
                
                    <Button  
                        variant="warning"
                        className={`mt-3 w-100 `} 
                        onClick={() => setDeviceUpdateVisible(true)}
                    >
                        Обновить устройство
                    </Button>
                    <Button  
                        variant="warning"
                        className={`mt-3 w-100 `} 
                        onClick={() => setTypeUpdateVisible(true)}
                    >
                        Обновить тип
                    </Button>
                    <Button  
                        variant="warning"
                        className={`mt-3 w-100 `} 
                        onClick={() => setBrandUpdateVisible(true)}
                    >
                        Обновить бренд
                    </Button>

                <hr/>

                    <Button  
                        variant="danger"
                        className={`mt-3 w-100 `} 
                        onClick={() => setDeviceDeleteVisible(true)}
                    >
                        Удалить устройство
                    </Button>
                    <Button  
                        variant="danger"
                        className={`mt-3 w-100 `} 
                        onClick={() => setTypeDeleteVisible(true)}
                    >
                        Удалить тип
                    </Button>
                    <Button  
                        variant="danger"
                        className={`mt-3 w-100 `} 
                        onClick={() => setBrandDeleteVisible(true)}
                    >
                        Удалить бренд
                    </Button>

                <DeviceIssue 
                    show={deviceIssueVisible}
                    onHide={() => setDeviceIssueVisible(false) }
                />

                <CreateDevice 
                    show={deviceVisible} 
                    onHide={() => setDeviceVisible(false)}
                    title="Устройство"
                    updateItem={(device)=> createDevice(device)}
                    afterUpdate={async () => device.setDevices(await fetchAllDevices())}
                />

                <CreateBrand 
                    show={brandVisible} 
                    onHide={() => setBrandVisible(false)}
                    title="Бренд"
                    items={brand.brands}
                    updateItem={(brand)=> createBrand(brand)}
                    afterUpdate={async () => brand.setBrands(await fetchBrands())}
                />
                <CreateType
                    show={typeVisible} 
                    onHide={() => setTypeVisible(false)}
                    title="Тип"
                    items={type.types}
                    updateItem={(type)=> createType(type)}
                    afterUpdate={async () => type.setTypes(await fetchTypes())}
                />

                <UpdateDevice 
                    title="Устройство"
                    show={deviceUpdateVisible} 
                    onHide={()=>setDeviceUpdateVisible(false)} 
                    items={device.devices}
                    updateItem={(device)=> updateDevice(device)}
                    afterUpdate={async () => device.setDevices(await fetchAllDevices())}
                    brands={brand.brands}
                    types={type.types}
                />

                <UpdateBrand 
                    title="Бренд"
                    show={brandUpdateVisible} 
                    onHide={()=>setBrandUpdateVisible(false)} 
                    items={brand.brands}
                    updateItem={(brand)=> updateBrand(brand)}
                    afterUpdate={async () => brand.setBrands(await fetchBrands())}
                />

                <UpdateType 
                    title="Тип"
                    show={typeUpdateVisible} 
                    onHide={()=>setTypeUpdateVisible(false)} 
                    items={type.types}
                    updateItem={(type)=> updateType(type)}
                    afterUpdate={async () => type.setTypes(await fetchTypes())}
                />
        
                
                <Delete 
                    title="Бренд"
                    show={brandDeleteVisible} 
                    onHide={()=>setBrandDeleteVisible(false)} 
                    items={brand.brands}
                    deleteItem={(name)=> deleteBrand(name)}
                    afterDelete={async () => brand.setBrands(await fetchBrands())}
                />
                <Delete 
                    title="Тип"
                    show={typeDeleteVisible} 
                    onHide={()=>setTypeDeleteVisible(false)} 
                    items={type.types}
                    deleteItem={(type)=> deleteType(type)}
                    afterDelete={async () => type.setTypes(await fetchTypes())}
                />
                <Delete 
                    title="Устройство"
                    show={deviceDeleteVisible} 
                    onHide={()=>setDeviceDeleteVisible(false)} 
                    items={device.devices}
                    deleteItem={(device)=> deleteDevice(device)}
                    afterDelete={async () => device.setDevices((await fetchDevices()).rows)}
                />

            </div>
        </Container>
    )
})

export default Admin

