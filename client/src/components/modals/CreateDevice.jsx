import React from 'react'
import Modal from 'react-bootstrap/esm/Modal'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Dropdown from 'react-bootstrap/esm/Dropdown'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import { fetchTypes } from '../../http/typeAPI'
import { fetchBrands } from '../../http/brandAPI'
import { createDevice } from '../../http/deviceAPI'

const CreateDevice = observer(({show, onHide}) => {
    const {brand, type} = React.useContext(Context)

    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState(0)
    const [img, setImg] = React.useState(null)
    const [chosenBrand, setChosenBrand] = React.useState({})
    const [chosenType, setChosenType] = React.useState({})
    const [info, setInfo] = React.useState([])
    const [uploadStatus, setUploadStatus] = React.useState('')

    const addInfo=() => {
        setInfo(prev => [...prev, {title:'', description:'', id: prev.length }])
    }

    const removeInfo = (id) => {
        setInfo(info.filter(val => val.id !== id))
    }

    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]:value}: i))
    }

    const selectFile = e => {
        setImg(e.target.files[0])
    }

    const addDevice = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price',`${price}`)
        formData.append('img', img)
        formData.append('brandId', chosenBrand.id)
        formData.append('typeId',  chosenType.id)
        formData.append('info', JSON.stringify(info))
         try {
            setUploadStatus("Идет загрузка...")
            await createDevice(formData)
            setUploadStatus("Информация загружена!")
            setTimeout(()=> { clearAll(); onHide() }, 500)
         }  catch (e) {
            alert(e.response.data.message)
         }        
    }

    const clearAll = () => {
        setName('')
        setPrice(0)
        setImg(null)
        setChosenBrand({})
        setChosenType({})
        setInfo([])
        setUploadStatus('')
    }

    React.useEffect(()=> {
        if (show) {
            fetchTypes().then(data => type.setTypes(data))
            fetchBrands().then(data => brand.setBrands(data))
        }
    },[show])
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить устройство
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Dropdown className="mt-2">
                    <Dropdown.Toggle>{chosenType.name || 'Выберите тип'}  </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {type.types.map((t) => 
                            <Dropdown.Item 
                                key={t.id}
                                onClick={() => setChosenType({id:t.id, name:t.name})}
                            >
                                {t.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2">
                    <Dropdown.Toggle>{chosenBrand.name || 'Выберите бренд'}  </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {brand.brands.map((b) => 
                            <Dropdown.Item 
                                key={b.id}
                                onClick={() => setChosenBrand({id:b.id, name:b.name})}

                            >
                                {b.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                    placeholder={"Введите название устройства..."} 
                />    

                <Form.Control
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="mt-2"
                    placeholder={"Введите стоимость устройства..."} 
                    type="number"
                />
                <Form.Label  className="mt-2 d-block">Изображение устройства</Form.Label>    
                <Form.Control
                    onChange={selectFile}
                    className="d-block"
                    placeholder={"Изображение..."}
                    type="file"
                />   
              
                {info.map(i => 
                    <Row key={i.id} className="mt-2">
                        <Col md={4}>
                            <Form.Control
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.id)}
                                placeholder="Введите название "
                            />   
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.id)}
                                placeholder="Введите описание "
                            />   
                        </Col>
                        <Col md={4}>
                            <Button 
                                variant="outline-danger"
                               
                                onClick={() => removeInfo(i.id)}
                            >
                                Удалить
                            </Button> 
                        </Col>
                    </Row>
                )}

                <Button 
                    variant="outline-dark mt-2"
                    onClick={addInfo}
                >
                    Добавить новое свойтсво
                </Button>

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <div>
                {uploadStatus}
            </div>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            <Button variant="outline-info" onClick={addDevice}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    )
})

export default CreateDevice
