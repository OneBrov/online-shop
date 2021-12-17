const { Cart, Device } = require("../models/models")
const ApiError = require('../error/apiError')


class CartController {
    async add(req, res, next){
        const {deviceId} = req.body
        const userId = req.user.id
        //console.log(userId);
        const device = await Device.findOne({where:{id:deviceId}})
        if (!device) {
            return next(ApiError.internal('Добавляемый товар не найден!'))
        }
        const cart = await Cart.create({deviceId, userId})
       
        return res.json(cart)
    }

    async delete(req, res, next) {
        try {
            const {deviceId} = req.body
            //console.log(deviceId);
            const userId  = req.user.id
            if (deviceId) {
                const cartItem = await Cart.findOne({where: {userId: userId, deviceId: deviceId}})
                return res.json(await cartItem.destroy()) 
            } 
            const cartItems = await Cart.findAll({where: {userId: userId}})
            return res.json(await cartItems.destroy()) 
        } catch (e) {
            return next(ApiError.internal(`Не удалось удалить устройство! ${e}`))
        }

    }

    async getAll(req, res, next) {
        try {
            const userId = req.user.id
            const cart = await Cart.findAll({where:{userId: userId}})
            return res.json(cart)
        } catch (e) {
            return next(ApiError.internal(`Корзина пуста! ${e}`))
        }

    }
}

module.exports = new CartController()