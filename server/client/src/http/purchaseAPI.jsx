import { $authHost, $host } from ".";


export const addToPurchase = async (deviceId, count) => {
    const {data} = await $authHost.post('api/purchase', {deviceId, count})
    return data
}

export const updatePurchase = async (purchase) => {
    const {data} = await $authHost.put('api/purchase', {...purchase})
    return data
}

export const removeFromPurchase = async (deviceId)=>{
    const {data} = await $authHost.delete('api/purchase', {data : {deviceId}})
    return data
}

export const fetchOnePurchase = async (id) => {
    const {data} = await $authHost.get('api/purchase/' + id)
    return data
}

export const fetchPurchases = async ()=>{
    const {data} = await $authHost.get('api/purchase')
    return data
}


