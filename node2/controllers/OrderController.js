const { User, Product, Photo, Cart, Orders } = require('../models')

class OrderController {
    async myOrders(req, res) {
        let myOrders = await Orders.findAll({
            where: { usersid: req?.user?.id },
            include: { all: true, nested: true },
        });
        console.log(myOrders);
        res.send({ myOrders });
    }
}
module.exports = {
    OrderController: new OrderController
}