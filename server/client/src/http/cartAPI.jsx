import { $authHost, $host } from ".";


export const addToCart = async (deviceId) => {
    //console.log("addToCart" + deviceId);
    const {data} = await $authHost.post('api/cart', {deviceId})
    return data
}

export const removeFromCart = async (deviceId)=>{
    const {data} = await $authHost.delete('api/cart', {data : {deviceId}})
    return data
}

export const fetchCart = async ()=>{
    const {data} = await $authHost.get('api/cart')
    return data
}


