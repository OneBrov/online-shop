const e = require("cors")
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

    async delete(req, res, next) {
        try {
            const {id} = req.body
            const brand = await Brand.findByPk(id)
            return res.json(await brand.destroy())
        } catch (e) {
            return next(badRequest("Не удалось найти удаляемый бренд или данному бренду принадлежат товары!"));
        }
    }

    //update exist brand
    async update(req, res, next) {
        try {
            const brand = req.body
            console.log(brand);
           
            const updated = await Brand.update(
                {name: brand.name}, 
                {where: {id: brand.id}}
            )
            
           
            return res.json(updated)
        } catch (e) {
            return next(badRequest("Не удалось обновить данный бренд!"));
        }
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()