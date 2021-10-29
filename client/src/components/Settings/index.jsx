import { observer } from 'mobx-react-lite'
import React from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { Context } from '../..'
import { fetchDevices } from '../../http/deviceAPI'
import styles from './Settings.module.scss'

const sortOptions = [
    {label: 'Цене', value: "price"},
    {label: 'Рейтингу', value: "rating"},
    {label: 'Дате выхода', value: "createdAt"},
]


export const Settings = observer(({
    typeId, setLoading
}) => {

    const { brand, device } = React.useContext(Context)

    const [name, setName] = React.useState('')
    const [minPrice, setMinPrice] = React.useState(0)
    const [maxPrice, setMaxPrice] = React.useState(100000)
    const [selectedBrands, setSelectedBrands] = React.useState([])
    const [minRating, setMinRating] = React.useState(0)
    const [sortOption, setSortOption] = React.useState('price')
    const [isDesc, setIsDesc] = React.useState(false)

    React.useEffect(()=>{
        device.setDevices([])
        setLoading(true)
        fetchDevices(
            device.page, 
            device.limit,
            name, 
            minPrice,
            maxPrice,
            selectedBrands,
            [typeId],
            minRating, 
            sortOption,
            isDesc
        ).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        }).finally(
            setLoading(false)
        )
    },[name, minPrice, maxPrice, selectedBrands, minRating, device, typeId, setLoading, sortOption, isDesc, device.page])



    const handleChangeSelectedBrands = (e) => {
        const options = e.target.options;
        const brands = [];
        for (let i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            brands.push(options[i].value);
          }
        }
        setSelectedBrands(brands)
    }

    console.log(isDesc);

    return (
        <>
            <h4> Настройки </h4>
            <Form className={styles.settings}>
                <Form.Group>
                    <Form.Label> Название </Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Поиск по названию..."
                        value={name}
                        onChange={(e)=>setName(e.target.value)}  
                    />
                </Form.Group>
                <hr />
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Минимальная цена</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={minPrice}
                            onChange={(e)=> setMinPrice(e.target.value)}  
                        />
                    </Form.Group>
                
                    <Form.Group as={Col}>
                        <Form.Label>Максимальная цена</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={maxPrice}
                            onChange={(e)=> setMaxPrice(e.target.value)} 
                        />
                    </Form.Group>
                </Row>
                <hr />
                <Form.Group>
                    <Form.Label> Бренд </Form.Label>
                    <Form.Control 
                        as="select" 
                        multiple 
                        type="text" 
                        onChange={handleChangeSelectedBrands}
                        values={brand.brands}
                        // value={brand.brands}
                    >
                        {brand.brands.map(b => 
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        )}
                    </Form.Control>
                </Form.Group>
                <hr />
                <Form.Group>
                    <Form.Label className="d-flex">Минимальный рейтинг</Form.Label>
                    <div className="d-flex align-items-center">
                        0
                        <Form.Control 
                            value={minRating}  
                            min={0} 
                            max={5}
                            step={0.1} 
                            className="w-100 mx-3" 
                            type="range" 
                            onChange={e=> setMinRating(e.target.value)}
                         />
                        5
                        <Form.Control value={minRating}  onChange={e=> setMinRating(e.target.value)} min={0} max={5} className="w-25 ms-3" type="number"/>
                    </div>
                </Form.Group>
                <hr />
                <Form.Group>
                  
                    <Form.Label> Сортировать по </Form.Label>
                   
                    <Form.Control 
                        as="select" 
                        
                        type="text" 
                        onChange={(e) => setSortOption(e.target.value)}
                        values={sortOptions.map(opt => opt.label)}
                        // value={brand.brands}
                    >
                        {sortOptions.map((opt, it) => 
                        <option key={it} value={opt.value}>
                                {opt.label}
                            </option>
                        )}
                    </Form.Control>

                    <Form.Check
                        name="radio"
                        type="radio"
                        label="По убыванию"
                        id={`desc`}
                        onClick={()=> setIsDesc(true)}
                    />
                    <Form.Check
                        name="radio"
                        type="radio"
                        label="По возрастанию"
                        id={`asc`}
                        onClick={()=> setIsDesc(false)}
                    />

                </Form.Group>
            </Form>
        </>
    )
})
