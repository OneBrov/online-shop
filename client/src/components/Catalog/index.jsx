import React from 'react'
import { observer } from "mobx-react-lite"
import { Context } from "../../"
import ListGroup from 'react-bootstrap/ListGroup'

import styles from './Catalog.module.scss'

const Catalog = observer( () => {
    const {type, device} = React.useContext(Context)
    console.log(device.typeId)
    return (
        <div className={`d-flex flex-column pt-4 pb-4 ${styles.catalog}`}>
            {type.types.map((t) =>
                <p 
                    key={t.id} 
                    className={`fs-5 p-2 m-0 ${styles.catalogItem}`}
                    onClick={()=>device.setTypeId(t.id)}
                >
                    {t.name}
                </p>
            )}
        </div>
    )
})

export default Catalog



