import { $authHost, $host } from ".";


export const rateDevice = async (id, rating) => {
    console.log(rating);
    const {data} = await $authHost.post(`api/device/rating/${id}`, {rating : rating} ) 
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const deleteDevice = async (device) => {
    const {data} = await $authHost.delete('api/device', {data: {id: device.id}})
    return data
}

export const updateDevice = async (device) => {
    const formData = new FormData()
    formData.append('id', device.id)
    formData.append('name', device.name)
    formData.append('price',`${device.price}`)
    formData.append('img', device.img)
    formData.append('description', device.description)
    formData.append('brandId', device.brandId)
    formData.append('typeId',  device.typeId)
    formData.append('info', JSON.stringify(device.info))
    formData.append('stock', `${device.stock}`)
    const {data} = await $authHost.put('api/device', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    return data
}

export const fetchDevices = async (
    page, 
    limit = 5, 
    name, 
    minPrice, 
    maxPrice, 
    brands, 
    types, 
    rating,
    sortOption,
    isDesc
) => {
    const {data} = await $host.get(
        'api/device', 
         {params: { 
            page, 
            limit, 
            name, 
            minPrice, 
            maxPrice, 
            brands, 
            types, 
            rating,
            sortOption,
            isDesc
        }})
    return data
}

export const fetchAllDevices = async () => {
    const {data} = await $host.get('api/device/all')
    return data
}

// export const fetchDevices = async () => {
//     const {data} = await $host.get('api/device')
//     return data
// }

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
