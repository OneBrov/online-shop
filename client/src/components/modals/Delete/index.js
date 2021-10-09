import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form, Modal, Dropdown, Row } from 'react-bootstrap'

export const Delete = observer(({show, onHide, deleteItem, items, title, afterDelete}) => {

    const [item, setItem] = React.useState({})
    const [uploadStatus, setUploadStatus] = React.useState('')

    React.useEffect(()=> {
      if (!show) setUploadStatus('')
    }, [show]) 

    const  handleDeleteItem = async () => {
      try {
        setUploadStatus("Идет загрузка...")
        const itemResponse = await deleteItem(item)
        setItem('')
        setUploadStatus(`Информация удалена! ${itemResponse}`)
        await afterDelete()
      } catch (e) {
        // setUploadStatus(e)
        setUploadStatus(e.response?.data.message)
      }
    } 

    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Удалить {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
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
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>
              {uploadStatus}    
          </p>
  
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            <Button variant="danger" onClick={() =>handleDeleteItem()}>Удалить</Button>
       
           
        </Modal.Footer>
      </Modal>
    )
})
