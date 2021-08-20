const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Cart = sequelize.define('cart', {

})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Type = sequelize.define('type', {
    id :{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull:false}
})

const Brand = sequelize.define('brand', {
    id : {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull:false}
})

const Rating = sequelize.define('rating', {
    id : {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    rate: {type: DataTypes.INTEGER, allowNull:false}
})

const DeviceInfo = sequelize.define('device_info', {
    id : {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title: {type: DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING, allowNull:false}
})



User.hasMany(Rating)
Rating.belongsTo(User)

User.belongsToMany(Device, { through: Cart })
Device.belongsToMany(User, { through: Cart })

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

module.exports = {
    User, 
    Cart, 
    Device, 
    Type, 
    Brand, 
    Rating, 
    DeviceInfo
}
