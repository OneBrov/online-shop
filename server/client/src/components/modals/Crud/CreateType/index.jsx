import React from 'react'
import { Form } from 'react-bootstrap'
import { Crud } from '..'

export const CreateType = ({show, onHide, updateItem, items, title, afterUpdate}) => {
    const [item, setItem] = React.useState("")

    return (
        <Crud 
            show={show} 
            onHide={onHide} 
            changeItem={updateItem} 
            title={title} 
            afterChange={afterUpdate} 
            item={{name: item}}
            setItem={(val) =>setItem(val)}
            crudType="create"
        >
             <Form.Control
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder={"Введите тип..."} 
                />    
        </Crud>
    )
}
