import React from 'react'
import Modal from 'react-bootstrap/esm/Modal'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import { createType } from '../../http/typeAPI'

const CreateType = ({show, onHide}) => {
    const [type, setType] = React.useState('')
    const [uploadStatus, setUploadStatus] = React.useState('')

    React.useEffect(()=> {
      if (!show) setUploadStatus('')
    }, [show]) 

    const  handleAddType = async () => {
      try {
        setUploadStatus("Идет загрузка...")
        const typeResponse = await createType({name:type})
        setType('')
        setUploadStatus("Информация загружена!")
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
            Добавить тип
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder={"Введите тип..."} 
                />    
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <div>
              {uploadStatus}
            </div>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            <Button variant="outline-info" onClick={handleAddType}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default CreateType
