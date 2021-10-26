import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form, Modal, Dropdown, Row } from 'react-bootstrap'
import { Crud } from '..'

//template func component, for deleting data by requests on server
export const Delete = observer(({show, onHide, deleteItem, items, title, afterDelete}) => {

    const [item, setItem] = React.useState({})
    const [uploadStatus, setUploadStatus] = React.useState('')

    React.useEffect(()=> {
      if (!show) setUploadStatus('')
    }, [show]) 

    return (
        <Crud
            show={show} 
            onHide={onHide} 
            changeItem={deleteItem} 
            title={title} 
            afterChange={afterDelete} 
            item={item}
            setItem={setItem}
            crudType="delete"
        >
            <Dropdown className="mt-2">
                <Dropdown.Toggle>{item?.name || `Выберите ${title}`}  </Dropdown.Toggle>
                <Dropdown.Menu>
                    {items.map((i) => 
                        <Dropdown.Item 
                            key={i.id}
                            onClick={() => setItem({id:i.id, name:i.name})}
                        >
                            {i.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
      </Crud>
    )
})
