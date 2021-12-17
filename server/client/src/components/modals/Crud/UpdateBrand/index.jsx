import React from 'react'
import { Button, Form, Modal, Dropdown, Row } from 'react-bootstrap'
import { Crud } from '..'

export const UpdateBrand = ({show, onHide, updateItem, items, title, afterUpdate}) => {
    const [item, setItem] = React.useState({})
    const [newItem, setNewItem] = React.useState("")

    return (
        <Crud 
            show={show} 
            onHide={onHide} 
            changeItem={updateItem} 
            title={title} 
            afterChange={afterUpdate} 
            item={{...item, name: newItem}}
            setItem={(val) => { setItem(val); setNewItem("") }}
            crudType="update"
        >
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
            <h4 className="mt-2" > Изменить на: </h4>
            <Form.Control
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder={`Введите ${title}...`} 
            />    
        </Crud>
    )
}
