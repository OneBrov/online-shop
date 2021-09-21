const { badRequest } = require("../error/apiError")
const { Brand } = require("../models/models")

class BrandController {
    async create(req, res, next){
        try {
            const {name} = req.body
            const brand = await Brand.create({name})
            return res.json(brand)
        } catch (e) {
            return next(badRequest("Введенный бренд уже существует!"));
        }


    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()