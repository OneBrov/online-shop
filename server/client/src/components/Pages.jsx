import { observer } from 'mobx-react-lite'
import React from 'react'
import Pagination from 'react-bootstrap/esm/Pagination'
import { Context } from '..'

const Pages = observer(() => {
    const {device} =  React.useContext(Context)
    const [pageCount, setPageCount] = React.useState(0)
    const [pages, setPages] = React.useState([])

    React.useEffect(()=>{
        setPages(Array(pageCount).fill().map((_, i) => i+1))
    },[device, device.devices, pageCount])

    React.useEffect(()=>{
        setPageCount(Math.ceil(device.totalCount / device.limit))
    },[device.limit, device.totalCount, pageCount])


    return (
        <Pagination className="mt-3 ms-3">

            {pages.map(page => 
                <Pagination.Item
                    activeLabel=""
                    key={page}
                    active={device.page === page}
                    onClick={()=> {
                        device.setPage(page)
                        window.scrollTo(0, 0)
                    }}
                >
                    {page}
                </Pagination.Item>    
            )}
     
        </Pagination>
    )
})

export default Pages
