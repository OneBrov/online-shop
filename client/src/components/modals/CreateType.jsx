import React from 'react'
import Modal from 'react-bootstrap/esm/Modal'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import { createType } from '../../http/typeAPI'

const CreateType = ({show, onHide}) => {
    const [type, setType] = React.useState('')
    const addType = () => {
      createType({name:type}).then(data => {
        setType('')
        onHide()
      })
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
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            <Button variant="outline-info" onClick={addType}>Дабавить</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default CreateType
