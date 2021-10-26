import { observer } from 'mobx-react-lite'
import React from 'react'
import { Context } from '..'
import { DeviceItem } from './DeviceItem'

const DeviceList = observer(() => {
    const {device} = React.useContext(Context)
    return (
        <div className="d-flex flex-column p-3 mt-4">
            {device?.devices?.map( device => 
                <DeviceItem key={device.id} device={device}/>
             )}
        </div>
    )
})

export default DeviceList
