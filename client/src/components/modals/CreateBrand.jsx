import React from 'react'

import Modal from 'react-bootstrap/esm/Modal'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import { createBrand } from '../../http/brandAPI'

const CreateBrand = ({show, onHide}) => {
    const [brand, setBrand] = React.useState('')
    const [uploadStatus, setUploadStatus] = React.useState('')

    React.useEffect(()=> {
      if (!show) setUploadStatus('')
    }, [show]) 


    const  handleAddBrand = async () => {
      try {
        setUploadStatus("Идет загрузка...")
        const brandResponse = await createBrand({name:brand})
        setBrand('')
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
            <div className="mx-2">
              {uploadStatus}
            </div>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            <Button variant="outline-info" onClick={() =>handleAddBrand()}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default CreateBrand
