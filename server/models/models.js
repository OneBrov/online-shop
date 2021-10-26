const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Cart = sequelize.define('cart', {})

const Purchase = sequelize.define('purchases', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    isIssued: {type: DataTypes.BOOLEAN, defaultValue: false},
    count: {type: DataTypes.INTEGER, defaultValue: 1}
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true, defaultValue: ''}
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


// User.belongsToMany(Device, 

//     {   through: {
//         model: Purchase,
//         unique: false,
//     },
//     foreignKey: 'userId',  constraints: false, onDelete: 'cascade'}
// )
// Device.belongsToMany(User, 
//     { through: {model: Purchase, unique: false}, foreignKey: 'Id', unique: false, constraints: false,onDelete: 'cascade'}
// )

User.hasMany(Purchase);
Purchase.belongsTo(User);
Device.hasMany(Purchase);
Purchase.belongsTo(Device);

User.hasMany(Rating)
Rating.belongsTo(User)

Device.hasMany(Rating)
Rating.belongsTo(Device)

User.belongsToMany(Device, { through: Cart, onDelete: 'cascade'})
Device.belongsToMany(User, { through: Cart, onDelete: 'cascade'})

Type.hasOne(Device, {onDelete: 'cascade'})
Device.belongsTo(Type, {onDelete: 'cascade'})

Brand.hasOne(Device, {onDelete: 'cascade'})
Device.belongsTo(Brand, {onDelete: 'cascade'})


Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

module.exports = {
    User, 
    Cart, 
    Purchase,
    Device, 
    Type, 
    Brand, 
    Rating, 
    DeviceInfo
}
