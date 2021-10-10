const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/apiError')
const { badRequest } = require("../error/apiError")

class DeviceController {

    // creating device in db
    async create(req, res, next){
        try {
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img:fileName})
            
            if (info){
                
                let parsedInfo = JSON.parse(info)
                parsedInfo.forEach(i => {
                    DeviceInfo.create({
                        title:i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //removing one device
    async delete(req, res, next) {
        try {
            console.log("____---______");
            const {id} = req.body
            const device = await Device.findByPk(id)
            console.log(device.img);
            fs.unlink(path.resolve(__dirname, '..', 'static', device.img), (err)=>{
                if (err) console.log(err);
            })
            return res.json(await device.destroy())
        } catch (e) {
            console.log(e);
            return next(badRequest("Не удалось удалить устройство"));
        }
    }

    // get request with offset option for pages
    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit  || 9
        let offset = page * limit - limit
        let devices
        if (!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        } else if (brandId && !typeId){
            devices = await  Device.findAndCountAll({where:{brandId}, limit, offset})
        } else if (!brandId && typeId){
            devices = await  Device.findAndCountAll({where:{typeId}, limit, offset})
        }else if (brandId && typeId){
            devices = await  Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }

        return res.json(devices)
    }

    // get request for 1 device
    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include:[{model:DeviceInfo, as: 'info'}]
        })
        return res.json(device)
    }


}

module.exports = new DeviceController()