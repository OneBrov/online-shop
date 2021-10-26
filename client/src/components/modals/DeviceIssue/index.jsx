import React from 'react'
import { Alert, Button, Dropdown, Form } from 'react-bootstrap'
import { fetchOnePurchase, updatePurchase } from '../../../http/purchaseAPI'
import { Crud } from '../Crud'

export const DeviceIssue = ({show, onHide}) => {
    const [purchaseKey, setPurchaseKey] = React.useState('') 
    const [purchase, setPurchase] = React.useState()
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [newPurchaseStatus, setNewPurchaseStatus] = React.useState(false)
    

    const [message, setMessage] = React.useState('')

    React.useEffect(()=>{
        if (isSuccess) {
            setPurchase()
        }
    },[isSuccess])


    const  handleFetchPurchase = async () => {
        setIsSuccess(false)
        setPurchase()
        if (!purchaseKey.length) return setMessage('Вы не ввели код покупки!')
        const p = await fetchOnePurchase(purchaseKey)
        if (!p) return setMessage('Не удалось найти покупку с данным кодом!')
        if (p.isIssued) return setMessage('Данный товар уже выдан!')
        setPurchase(p)
        setMessage('')
    }
    console.log(newPurchaseStatus);
    console.log(purchase);


    return (
        <Crud
            show={show} 
            onHide={onHide} 
            changeItem={updatePurchase} 
            afterChange={()=> setIsSuccess(true)} 
            item={{...purchase, isIssued: newPurchaseStatus}}
            setItem={(val) => { setPurchase(val); setNewPurchaseStatus(false) }}
            crudType="issue"
        >
            <Form.Label>
                Код покупки
            </Form.Label>
            <Form.Control
                value={purchaseKey}
                onChange={(e) => setPurchaseKey(e.target.value)}
                placeholder={ `Введите код покупки...`} 
            >
            </Form.Control>
            <Button 
                className="mt-2"
                onClick={handleFetchPurchase}
                variant="info"
            >
                Найти покупку
            </Button>
            <hr/>
            {isSuccess 
            &&  <Alert variant="success">
                    Товар успешно выдан!
                </Alert>
            }

            {purchase 
            &&  
            <>
                {[
                    { label: 'Почта покупателя', value: purchase?.user?.email },
                    { label: 'Название устройства', value: purchase?.device?.name },
                    { label: 'Количество устройств', value: purchase?.count },
                    { label: 'Дата заказа', value: new Date(purchase?.createdAt).toLocaleString() },
                ].map((item, it) => 
                    <div key={it}>
                        <Form.Label>{item.label}</Form.Label>
                        <Form.Control disabled value={item.value} />
                    </div>
                )}

                <hr/>
               
                <Form.Check
                    className="mt-2 text-primary"
                    type='checkbox'
                    label={`Товар выдан`}
                    size="lg"
                    value={newPurchaseStatus}
                    onClick={()=>setNewPurchaseStatus(true) }
                />
                
            </>
            }

            {message 
            && <Alert className="mt-2" variant="warning">{message}</Alert>
            }
        </Crud>
    )
}

