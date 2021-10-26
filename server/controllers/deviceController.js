const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const {Device, DeviceInfo, Rating} = require('../models/models')
const ApiError = require('../error/apiError')
const { badRequest } = require("../error/apiError")
const { Op, fn, col, Sequelize } = require('sequelize')
const { models } = require('../db')
const { info } = require('console')

class DeviceController {

    // creating device in db
    async create(req, res, next){
        try {
            const {name, price, brandId, typeId, info, description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img:fileName, description})
            
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

    //removing the device
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

    async update(req, res, next) {
        try {
            const device = req.body
            const info = device.info
            const img = req.files?.img ? req.files.img : null 

            // handle change image
            if (img) {
                const oldDevice = await Device.findByPk(device.id)
                fs.unlink(path.resolve(__dirname, '..', 'static', oldDevice.img), (err)=>{
                    if (err) console.log(err);
                })
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                device.img = fileName
            }
            
            const updated = await Device.update(
                {...device}, 
                {where: {id: device.id}}
            )

            //replacing device info
            if (info){
                let parsedInfo = JSON.parse(info)
                //deleting old data
                const oldInfo = await DeviceInfo.destroy({where: {deviceId: device.id}})
                parsedInfo.forEach(i => {
                    console.log(i);
                    DeviceInfo.create({
                        title:i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }
            return res.json(updated)
        } catch (e) {
            console.log(e);
            return next(badRequest(`Не удалось обновить данное устройство! ${e}`));
        }
    }

    // get request with offset option for pages
    async getPage(req, res) {
        let {limit, page, name, minPrice, maxPrice, brands, types, rating, sortOption, isDesc} = req.query
        console.log("Setts------_____--------");
        console.log(limit, page, name, minPrice, maxPrice, brands, types, rating, sortOption, isDesc);
        
        const whereStatement = {}
        if (name) {
            whereStatement.name = {[Op.iLike] : `%${name}%`} 
        }
        if (minPrice && maxPrice) {
            whereStatement.price = {[Op.between] : [minPrice, maxPrice]}
        }
        if (types && types.length) {
            whereStatement.typeId = {[Op.in] : types}
        }
        if (brands) {
            whereStatement.brandId = {[Op.in] : brands}
        }
        if (!rating) {
            rating = 0
        }


        page = page || 1
        limit = limit  || 9
        let offset = page * limit - limit

        // find all correct devices (and do offset for pages )
        const devices = await Device.findAll(
            { 
                attributes : [
                    'id',
                    'name',
                    'price',
                    'img',
                    'typeId',
                    'brandId',
                    [
                        Sequelize.fn("avg", Sequelize.col("ratings.rate")), "rating",
                    ],
                ],
                include:[ {
                    model: Rating, 
                    attributes: [],
                    required: false, 
                }],  
                where: {
                    ...whereStatement,
                }, 
                group: [  'device.id' ],
                having: Sequelize.literal(`coalesce(avg("ratings"."rate"), 0) >= ${rating}`),
                order: sortOption&&[ [
                    (sortOption === 'rating'
                    ? Sequelize.literal('rating') 
                    : sortOption),
                    (isDesc==='true' ? 'DESC' : 'ASC')
                ]],
                limit: limit,
                offset: offset, 
                subQuery: false,
            }
        )
    
        // counting all correct devices
        const count = await   Device.count({where: {...whereStatement}})
        // devices.map((item) => console.log(item))
        return res.json({ count : count, rows: devices })
    }

    async getAll(req, res) {
        const devices = await Device.findAll({include:[{model:DeviceInfo, as: 'info'}]})
        return res.json(devices) 
    }

    // get request for 1 device
    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include:[
                {model:DeviceInfo,  as: 'info'},
                //add avg rating
                {model: Rating,  attributes: [],   required: false, },
            ],
            attributes : [
                'id',
                'name',
                'price',
                'img',
                ['description' , 'deviceDescription'],
                'typeId',
                'brandId',
                'createdAt',
                'info.title',
                'info.description',
                [
                    Sequelize.fn("avg", Sequelize.col("ratings.rate")), "rating",
                ],
            ],
            group: [  'device.id', 'info.deviceId','info.id'],
        })
        const test = await Device.findOne({
            include:[
                {model:DeviceInfo,  as: 'info'},
            ],
            attributes : [
                'id',
                'name',
                'price',
                'img',
                ['description' , 'deviceDescription'],
                'typeId',
                'brandId',
                'createdAt',
                'info.title',
                'info.description'
            ],
            where: {id},
        })
        console.log(test.dataValues);
       
        return res.json(device)
    }

    //create new rating to device or update previous rating from user
    async createRating(req, res) {
        console.log("_______________Aboba--------------------------------");
        const {id} = req.params
        const {rating} = req.body
        const userId = req.user.id
        console.log(` device ${id} rate ${rating} user ${userId}`);
        const countRates = await Rating.count({where : {userId, deviceId: id}})
        if (countRates > 0) {
            const updatedRating = await Rating.update(
                {rate: rating, } , 
                {where: {deviceId: id, userId} }
            ) 
            return res.json(updatedRating)
        }
        const newRating = await Rating.create({deviceId: id, rate: rating, userId})

        return res.json(newRating)
    }

}

module.exports = new DeviceController()