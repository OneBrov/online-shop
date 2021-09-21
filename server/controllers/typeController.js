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

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()