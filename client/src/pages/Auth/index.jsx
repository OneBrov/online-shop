import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Card from 'react-bootstrap/esm/Card';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts';

import styles from './Auth.module.scss'
import { login, registration } from '../../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const Auth = observer( () => {
        const location = useLocation()
        const isLogin = location.pathname === LOGIN_ROUTE
        const history = useHistory()
        const {user} = React.useContext(Context)

        const [email, setEmail] = React.useState('')
        const [password, setPassword] = React.useState('')

        const onAuth = async () => {
            let data
            try {
                if (isLogin) {
                     data = await login(email, password);
                } else {
                     data = await registration(email, password);
                }
                user.setUser(data)
                user.setIsAuth(true)
                if (data.role === 'ADMIN') {
                    user.setIsAdmin(true)
                }
                history.push(SHOP_ROUTE)
            } catch(err) {
                alert(err.response.data.message )
            }
            
        }
        return (
        <Container 
            className="d-flex justify-content-center align-items-center mt-5"
        >
            <Card className='p-3'>
                <h2 className="text-center"> {isLogin ? 'Авторизация' : 'Регистрация'}   </h2>
                <Form className={`p-2 ${styles.auth}`}>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите вашу электронную почту"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button 
                        className={`mt-2 w-100 ${styles.confirm}`}
                        onClick={onAuth}
                    >
                        {isLogin ? 
                                'Войти'
                        :
                                'Зарегистрироваться'
                        }
                    </Button>  
                </Form>
                <Row className="d-flex justify-content-between mt-1  ">
                   {isLogin ? 
                        <div>
                                Если у вас нет аккаунта, <NavLink to={REGISTRATION_ROUTE}>зарегистрируйтесь</NavLink>!       
                        </div>  
                        :
                        <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>!       
                        </div>  
                   } 
                  

                </Row>
            </Card>
        </Container>
        )});

export default Auth;



