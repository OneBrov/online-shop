import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

export const SuccessMessage = ({
    show, onHide
}) => {
    const history = useHistory()
    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Вы успешно создали заказ!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Найти информацию о ваших заказах вы можете на {' '}
            <Link to="/purchases">
               странице заказов!
            </Link>
 
        </Modal.Body>
        <Modal.Footer>
    
            <Button variant="outline-primary" onClick={()=> history.push('/')}>На главную</Button>
            <Button variant="primary" onClick={() => history.push('/purchases')}>На страницу заказов</Button>
        </Modal.Footer>
      </Modal>
    )
}
