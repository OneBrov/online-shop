import React from 'react'
import { Form, Button, Dropdown, Row, Col } from 'react-bootstrap'
import { Crud } from '..'
import { Context } from '../../../..'

export const CreateDevice = ({show, onHide, updateItem, items, title, afterUpdate}) => {
    const {brand, type} = React.useContext(Context)

    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState(0)
    const [img, setImg] = React.useState(null)
    const [chosenBrand, setChosenBrand] = React.useState({})
    const [chosenType, setChosenType] = React.useState({})
    const [info, setInfo] = React.useState([])
    const [description, setDescription] = React.useState('')
    const [stock, setStock] = React.useState(1)

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

    const changeStock = e => {
        let value = Number(e.target.value)
        console.log(value);
        if (value < 0) {
            value = 0
        }
        setStock(value)
    }

    const clearAll = () => {
        setName('')
        setPrice(0)
        setImg(null)
        setChosenBrand({})
        setChosenType({})
        setInfo([])
        setStock(1)
        setDescription('')
    }

    const getItem = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price',`${price}`)
        formData.append('description', description)
        formData.append('img', img)
        formData.append('brandId', chosenBrand.id)
        formData.append('typeId',  chosenType.id)
        formData.append('stock',  stock)
        formData.append('info', JSON.stringify(info))
        return formData
    }
    return (
        <Crud 
            show={show} 
            onHide={onHide} 
            changeItem={updateItem} 
            title={title} 
            afterChange={afterUpdate} 
            item={getItem()}
            setItem={clearAll}
            crudType="create"
        >
             <Dropdown className="mt-2">
                    <Dropdown.Toggle>{chosenType.name || '???????????????? ??????'}  </Dropdown.Toggle>
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
                    <Dropdown.Toggle>{chosenBrand.name || '???????????????? ??????????'}  </Dropdown.Toggle>
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
                <Form.Label  className="mt-2 d-block">????????????????</Form.Label>    
                <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                    placeholder={"?????????????? ???????????????? ????????????????????..."} 
                />    
                <Form.Label  className="d-block">????????</Form.Label>   
                <Form.Control
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="mt-2"
                    placeholder={"?????????????? ?????????????????? ????????????????????..."} 
                    type="number"
                />
                <Form.Label  className="d-block">????????????????</Form.Label>   
                <Form.Control
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2"
                    as="textarea"
                    placeholder={"?????????????? ???????????????? ????????????????????..."} 

                />
                <Form.Label  className="d-block">???????????????????? ??????????????????</Form.Label>   
                <Form.Control
                    value={stock}
                    onChange={changeStock}
                    className="mt-2"
                    type="number"
                    placeholder={"?????????????? ???????????????????? ?????????????????? ???? ????????????..."} 

                />
                <Form.Label  className="d-block">?????????????????????? ????????????????????</Form.Label>    
                <Form.Control
                    onChange={selectFile}
                    className="d-block"
                    placeholder={"??????????????????????..."}
                    type="file"
                />   
              
                {info.map(i => 
                    <Row key={i.id} className="mt-2">
                        <Col md={4}>
                            <Form.Control
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.id)}
                                placeholder="?????????????? ???????????????? "
                            />   
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.id)}
                                placeholder="?????????????? ???????????????? "
                            />   
                        </Col>
                        <Col md={4}>
                            <Button 
                                variant="outline-danger"
                               
                                onClick={() => removeInfo(i.id)}
                            >
                                ??????????????
                            </Button> 
                        </Col>
                    </Row>
                )}

                <Button 
                    variant="outline-dark mt-2"
                    onClick={addInfo}
                >
                    ???????????????? ?????????? ????????????????
                </Button>

        </Crud>
    )
}
