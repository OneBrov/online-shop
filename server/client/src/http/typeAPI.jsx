import { $authHost, $host } from ".";


export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const deleteType = async (type) => {
    const {data} = await $authHost.delete('api/type', {data: {id: type.id}})
    return data
}

export const updateType = async (type) => {
    const {data} = await $authHost.put('api/type', {...type})
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}
