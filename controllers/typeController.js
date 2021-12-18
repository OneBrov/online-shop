const {Type} = require('../models/models')
const ApiError = require('../error/apiError')
const { badRequest } = require('../error/apiError')

class TypeController {
    async create(req, res, next){
        try {
            const {name} = req.body
            const type = await Type.create({name})
            return res.json(type)
        } catch (e) {
            next(badRequest("Введенный тип уже существует!"))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.body
            const type = await Type.findByPk(id)
            return res.json(await type.destroy())
        } catch (e) {
            return next(badRequest("Не удалось найти удаляемый тип или даному типу принадлежат товары!"));
        }
    }

    async update(req, res, next) {
        try {
            const type = req.body
            const updated = await Type.update(
                {name: type.name}, 
                {where: {id: type.id}}
            )
            return res.json(updated)
        } catch (e) {
            return next(badRequest("Не удалось обновить данный тип!"));
        }
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()