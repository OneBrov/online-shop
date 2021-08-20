import React from 'react'

import Modal from 'react-bootstrap/esm/Modal'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import { createBrand } from '../../http/brandAPI'

const CreateBrand = ({show, onHide}) => {
    const [brand, setBrand] = React.useState('')
    const addBrand = () => {
      createBrand({name:brand}).then(data => {
        setBrand('')
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
            Добавить бренд
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder={"Введите бренд..."} 
                />    
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            <Button variant="outline-info" onClick={addBrand}>Дабавить</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default CreateBrand
