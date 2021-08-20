const { Cart, Device } = require("../models/models")
const ApiError = require('../error/apiError')


class CartController {
    async add(req, res, next){
        const {deviceId} = req.query
        const userId = req.user.id
        const device = await Device.findOne({where:{id:deviceId}})
        if (!device) {
            return next(ApiError.internal('Добавляемый товар не найден!'))
        }
        const cart = await Cart.create({deviceId, userId})
       
        return res.json(cart)
    }

    async getAll(req, res) {
        const userId = req.user.id
        const cart = await Cart.findAll({where:{userId}})
        return res.json(cart)
    }
}

module.exports = new CartController()