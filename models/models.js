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
    deviceId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'device',
            key: 'id',
          },
        onDelete: 'cascade'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id',
        },
      onDelete: 'cascade'
    },
})

const Purchase = sequelize.define('purchases', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    isIssued: {type: DataTypes.BOOLEAN, defaultValue: false},
    count: {type: DataTypes.INTEGER, defaultValue: 1}
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false, validate : { min: 0 } } ,
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true, defaultValue: ''},
    stock: {type: DataTypes.INTEGER, allowNull: false, validate : { min: 0 } }
}, )

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
    rate: {type: DataTypes.INTEGER, allowNull:false},
    
})

const DeviceInfo = sequelize.define('device_info', {
    id : {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title: {type: DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING, allowNull:false},
  

})

User.hasMany(Purchase, {onDelete: 'CASCADE'});
Purchase.belongsTo(User, {onDelete: 'CASCADE'});
Device.hasMany(Purchase, {onDelete: 'CASCADE'});
Purchase.belongsTo(Device, {onDelete: 'CASCADE'});

User.hasMany(Rating, {onDelete: 'CASCADE'})
Rating.belongsTo(User, {onDelete: 'CASCADE'})

Device.hasMany(Rating, {onDelete: 'CASCADE'})
Rating.belongsTo(Device, {onDelete: 'CASCADE'})

User.belongsToMany(Device, { through: Cart, onDelete: 'CASCADE', hooks: true, })
Device.belongsToMany(User, { through: Cart, onDelete: 'CASCADE', hooks: true, })

Type.hasOne(Device, {onDelete: 'CASCADE'})
Device.belongsTo(Type, {onDelete: 'CASCADE'})

Brand.hasOne(Device, {onDelete: 'restrict'})
Device.belongsTo(Brand, {onDelete: 'restrict'})

Device.hasMany(DeviceInfo, {as: 'info', onDelete: 'CASCADE'})
DeviceInfo.belongsTo(Device, {onDelete: 'CASCADE'})

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
