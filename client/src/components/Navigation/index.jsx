import React from 'react'
import { Context } from '../..'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../../utils/consts'
import {observer} from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'

import styles from './Navigation.module.scss'
import cartIcon from '../../assets/shopping_cart.svg'

 const Navigation = observer( () =>  {
    const {user, device} = React.useContext(Context)
 
    const history = useHistory()

    const logout = () => {
        user.clearUser()
    }

    return (
        <Navbar className={styles.myNav}  expand="xl" variant={'dark'} >
            <Container>
                <Navbar.Brand 
                    className={`me-5 ${styles.cursorPointer}`} 
                    onClick={() => {
                        history.push(SHOP_ROUTE)
                    }}
                >
                    A Shop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className="" href="/computers">Компьютеры</Nav.Link>
                    <Nav.Link href="/phones">Смартфоны</Nav.Link>
                    <Nav.Link href="/accessories">Аксессуары</Nav.Link>
                </Nav>
                <Nav className={``}>
                    <Nav.Link href="/сontact">Контакты</Nav.Link>
                    <Nav.Link href="/purchaseHistory">История покупок</Nav.Link>
                    <Nav.Link className='d-flex' href="/cart">
                        Корзина 
                        <img className="ms-1" src={cartIcon} alt='' />
                    </Nav.Link>
                    {user.isAdmin &&  
                     <Button 
                        onClick={() => history.push(ADMIN_ROUTE)} 
                        variant="outline-info"
                        className={`mx-2 mb-1`}
                     >
                         Админ
                     </Button>
                    }
                    {user.isAuth ? 
                            <Button  
                                onClick={() => logout()}  
                                // className={styles.authButton}
                                variant="outline-info"
                                className={`mx-2 mb-1`}
                            >
                                Выйти</Button>
                    :
                            <Button 
                                onClick={() => history.push(LOGIN_ROUTE)} 
                                className={styles.authButton}
                            >
                                Авторизация
                            </Button>
                    }
                    
                </Nav>
                
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})

export default Navigation
