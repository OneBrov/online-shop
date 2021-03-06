import React from 'react'
import { Context } from '../..'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { ADMIN_ROUTE, CATALOG_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../../utils/consts'
import {observer} from 'mobx-react-lite'
import { Link, useHistory } from 'react-router-dom'

import styles from './Navigation.module.scss'
import cartIcon from '../../assets/shopping_cart.svg'
import historyIcon from '../../assets/history.svg'
import contactsIcon from '../../assets/contacts.svg'
import headphonesIcon from '../../assets/headphones.svg'
import phoneIcon from '../../assets/phone.svg'
import computerIcon from '../../assets/computer.svg'



 const Navigation = observer( () =>  {
    const {user, device} = React.useContext(Context)
 
    const history = useHistory()

    const logout = () => {
        user.clearUser()
    }

    return (
        <Navbar className={styles.myNav}  expand="xl" variant={'dark'} >
            <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                
                <Nav className="justify-content-between w-100">
                
                    
                    <Link to={`/`}>
                        <Nav.Link as="span" className="" href={`/`}>
                        <Navbar.Brand 
                        className={`me-5 ${styles.cursorPointer}`} 
                        onClick={() => {
                            history.push(SHOP_ROUTE)
                        }}
                        >
                            A Shop
                        </Navbar.Brand>
                        </Nav.Link>
                    </Link>
                    <Link to={`${CATALOG_ROUTE}/Компьютеры`}>
                        <Nav.Link as="span" className="" href={`${CATALOG_ROUTE}/Компьютеры`}>
                            Компьютеры
                            <img className="ms-1" src={computerIcon} width={24} height={24} alt='' />
                        </Nav.Link>
                    </Link>
                    
                    <Link to={`${CATALOG_ROUTE}/Смартфоны`}>
                        <Nav.Link as="span" href={`${CATALOG_ROUTE}/Смартфоны`}>
                            Смартфоны
                            <img className="ms-1" src={phoneIcon} width={24} height={24} alt='' />
                        </Nav.Link>
                    </Link>

                    <Link className="me-auto" to={`${CATALOG_ROUTE}/Аксессуары`}>
                        <Nav.Link as="span" href={`${CATALOG_ROUTE}/Аксессуары`}>
                            Аксессуары
                            <img className="ms-1" src={headphonesIcon} width={24} height={24} alt='' />
                        </Nav.Link>
                    </Link>
                    
                    <Link to="/contacts" >
                        <Nav.Link as="span" href="/contacts">
                            Контакты
                            <img className="ms-1" src={contactsIcon} width={24} height={24} alt='' />
                        </Nav.Link>
                    </Link>
                    <Link to="/purchases">
                        <Nav.Link as="span" href="/purchases">
                            История покупок
                            <img className="ms-1" src={historyIcon} width={24} height={24} alt='' />
                        </Nav.Link>
                    </Link>
                   
                    <Link to="/cart">
                        <Nav.Link as="span" className='d-flex' href="/cart">
                            Корзина 
                            <img className="ms-1" src={cartIcon} width={24} height={24} alt='' />
                        </Nav.Link>
                    </Link>
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
