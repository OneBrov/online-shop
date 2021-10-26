import React from 'react'
import { observer } from "mobx-react-lite"
import { Context } from "../../"
import ListGroup from 'react-bootstrap/ListGroup'
import styles from './Catalog.module.scss'
import { useHistory } from 'react-router'


const CatalogTypes = observer( () => {
    const {type, device} = React.useContext(Context)
    const history = useHistory()
    console.log(device.typeId)
    return (
        <div className={`d-flex flex-column ${styles.catalog}`}>
            {type.types.map((t) =>
                
                <p 
                    key={t.id} 
                    className={`fs-5 p-2 m-0 ${styles.catalogItem}`}
                    onClick = {() => history.push(`/catalog/${t.name}`)}
                >
                    {t.name}
                </p>
             
            )}
        </div>
    )
})

export default CatalogTypes



