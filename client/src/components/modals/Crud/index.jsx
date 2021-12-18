import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form, Modal, Dropdown, Row } from 'react-bootstrap'

const types = {
    create: {color: "info", title: "Создать"},
    update: {color: "warning", title: "Обновить"},
    delete: {color: "danger", title: "Удалить"},
    issue:  {color: "primary", title: "Выдать товар"},
}
//template func component, for deleting data by requests on server
export const Crud = observer(({
    show, onHide, changeItem, title, afterChange, children, setItem, item, crudType
}) => {
    const [uploadStatus, setUploadStatus] = React.useState('')
    const type = types[crudType]

    React.useEffect(()=> {
      if (!show) setUploadStatus('')
    }, [show]) 

    const  handleChangeItem = async () => {
      try {
        setUploadStatus("Идет загрузка...")
        const itemResponse = await changeItem(item)
        setItem(null)
        setUploadStatus(`Информация обновлена! `)
        await afterChange()
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
        className=""
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            {type.title} {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                {children}
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>
              {uploadStatus}    
          </p>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            <Button variant={type.color} onClick={() =>handleChangeItem()}>{type.title}</Button>
        </Modal.Footer>
      </Modal>
    )
})
