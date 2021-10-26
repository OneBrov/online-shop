const { Device, Purchase, User } = require("../models/models")
const ApiError = require('../error/apiError')
const { badRequest } = require('../error/apiError')

class PurchaseController {

    //creating purchase
    async create(req, res, next){
        const {deviceId, count} = req.body
        const userId = req.user.id
        const device = await Device.findOne({where:{id:deviceId}})
        if (!device) {
            return next(ApiError.internal('Добавляемый товар не найден!'))
        }
        const purchase = await Purchase.create({deviceId, userId, count})
        return res.json(purchase)
    }

    async update(req, res, next) {
        try {
            console.log('aboba');
            const purchase = req.body
            const updated = await Purchase.update(
                {isIssued: purchase.isIssued}, 
                {where: {id: purchase.id}}
            )
            return res.json(updated)
        } catch (e) {
            console.log(e);
            return next(badRequest("Не удалось обновить покупку!"));
        }
    }


    async delete(req, res, next) {
        try {
            const {deviceId} = req.body
            const userId  = req.user.id
            if (deviceId) {
                const purchase = await Purchase.findOne({where: {userId: userId, deviceId: deviceId}})
                return res.json(await purchase.destroy()) 
            } 
            const purchases = await Purchase.findAll({where: {userId: userId}})
            return res.json(await purchases.destroy()) 
        } catch (e) {
            return next(ApiError.internal(`Не удалось удалить устройство! ${e}`))
        }
    }

    async getAll(req, res, next) {
        try {
            const userId = req.user.id
            console.log("____________________________");
        const purchase = await Purchase.findAll({ where: {userId: userId} })
            console.log("------------------");
            return res.json(purchase)
        } catch (e) {
            console.log(e);
            return next(ApiError.internal(`Список покупок пуста! ${e}`))
        }

    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const purchase = await Purchase.findByPk(id, {
                include:[
                    { model: Device} ,
                    { model: User  }
                ],
            })
            console.log('aboba');
            return res.json(purchase)
        } catch (e) {
            console.log(e);
            return next(ApiError.internal(`Не удалось найти покупку с введенным кодом!`))
        }

    }
}

module.exports = new PurchaseController()