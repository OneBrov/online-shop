import React from 'react'
import { Button, Form, Modal, Dropdown, Row, Col } from 'react-bootstrap'
import { Crud } from '..'
import Image from 'react-bootstrap/esm/Image'

export const UpdateDevice = ({show, onHide, updateItem, items, brands = [], types = [], title, afterUpdate}) => {
    const [item, setItem] = React.useState()
    const [newImage, setNewImage] = React.useState(null)
    const getTypeFromTypeId = (typeId) => {
        const {name} = types.find((type) => type.id === typeId)
        return name
    }

    const getBrandFromId = (brandId) => {
        const { name } = brands?.find((brand)=> brand.id === brandId)
        return name
    }

    const addInfo=() => {
        setItem( prev => 
            { return {
                ...prev, 
                info: [...item.info, {title:'', description:'', id: item.info.length }]
            }})
    }

    const removeInfo = (id) => {
        setItem( prev => 
            { return {
                ...prev, 
                info: item.info
                        .filter(val => val.id !== id)
                        .map((val, it) => {return {...val, id: it}})
            }})
    }

    const changeInfo = (key, value, id) => {
        setItem( prev => 
            { return {
                ...prev, 
                info: item.info.map(i => i.id === id ? {...i, [key]:value}: i)
            }})
    }
    console.log({...item, ...(newImage&&{img: newImage})});
    return (
        <Crud 
            show={show} 
            onHide={onHide} 
            changeItem={updateItem} 
            title={title} 
            afterChange={afterUpdate} 
            item={{...item, ...(newImage&&{img: newImage})}}
            setItem={setItem}
            crudType="update"
        >
            <h5>Выберете устройство, которое хотите обновить</h5>
            <Dropdown className="mt-2">
                <Dropdown.Toggle>{item?.name || `Выберите ${title}`}  </Dropdown.Toggle>
                <Dropdown.Menu>
                    {items.map((i) => 
                        <Dropdown.Item 
                            key={i.id}
                            onClick={() => setItem(i)}
                        >
                            {i.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <h5 className="mt-3 mb-0">Свойства устройства:</h5>
            {item
            && <Row className="w-50 mx-auto">
                <div className="d-flex  justify-content-between">
                    <b className="mt-auto">Тип: </b>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>{item.typeId? getTypeFromTypeId(item?.typeId) : 'Выберите тип'}  </Dropdown.Toggle>
                        <Dropdown.Menu   >
                            {types.map((t) => 
                                <Dropdown.Item 
                                    key={t.id}
                                    onClick={()=>setItem(prev =>{ return {...prev, typeId: t.id}})}
                                >
                                    {t.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className=" d-flex mb-2 justify-content-between">
                    <b className="mt-auto">Бренд: </b>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle >{item.brandId? getBrandFromId(item?.brandId) : 'Выберите бренд'}  </Dropdown.Toggle>
                        <Dropdown.Menu   >
                            {brands.map((b) => 
                                <Dropdown.Item 
                                    key={b.id}
                                    onClick={()=>setItem(prev =>{ return {...prev, brandId: b.id}})}
                                >
                                    {b.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="d-flex mb-2 justify-content-between">
                    <b className="mt-auto me-5">Название: </b>
                    <Form.Control
                        className="w-50"
                        value={item.name}
                        onChange={(e) => setItem(prev => {return {...prev, name: e.target.value}})}
                        placeholder={"Введите бренд..."} 
                    />    
                </div>
                <div className="d-flex justify-content-between">
                    <b className="mt-auto me-5">Цена: </b>
                    <Form.Control
                        className="w-50"
                        value={item.price}
                        onChange={(e) => setItem(prev => {return {...prev, price: e.target.value}})}
                        placeholder={"Введите цену..."} 
                    />    
                </div>
                <div className="d-flex mt-2 justify-content-between">
                <b className="mt-auto me-5">Описание устройства </b>
                <Form.Control
                    value={item.description}
                    onChange={(e) => setItem(prev => {return {...prev, description: e.target.value}})}
                    className="mt-2"
                    as="textarea"
                    placeholder={"Введите описание устройства..."} 

                />
                </div>
               
                <div className="d-flex mt-2 justify-content-between">
                <b className="mt-auto me-5">Изображение устройства: </b>
                <Form.Control
                    onChange={e => setNewImage(e.target.files[0]) }
                    className="d-block"
                    placeholder={"Изображение..."}
                    type="file"
                />
                </div>
                <div>
                <Image 
                className="d-flex ms-auto"
                height={100}
                width="auto"
                src={ newImage
                    ? URL.createObjectURL(newImage)
                    : process.env.REACT_APP_API_URL + item.img} 
                alt="Device" 
                />    
                </div>
                
                <h6 className="mt-4"><b>Характеристики: </b></h6>
                {item.info.map(i => 
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
              
            </Row>
            }
        </Crud>
    )
}
