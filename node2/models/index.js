const { Sequelize } = require('sequelize')
const config = require('../config/config')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT,
})

const User = require('./user')(sequelize, Sequelize)
const Product = require('./product')(sequelize, Sequelize)
const Photo = require('./photo')(sequelize, Sequelize)
const Cart = require('./cart')(sequelize, Sequelize)
const Orders = require('./orders')(sequelize, Sequelize)
const Order_Details = require('./order_details')(sequelize, Sequelize)
Product.hasMany(Photo)
Photo.belongsTo(Product)
Cart.belongsTo(Product, { foreignKey: 'productId' })
// User.hasMany(Orders)
sequelize.sync()
module.exports = {
    User,
    Product,
    Photo,
    Cart,
    Orders,
    Order_Details
}