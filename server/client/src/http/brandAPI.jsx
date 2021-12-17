import { $authHost, $host } from ".";


export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const deleteBrand = async (brand) => {
    const {data} = await $authHost.delete('api/brand', {data: {id: brand.id}})
    return data
}

export const updateBrand = async (brand) => {
    const {data} = await $authHost.put('api/brand', {...brand})
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}
