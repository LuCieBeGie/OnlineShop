const { User, Product, Photo, Cart, Orders, Order_Details } = require('../models')
const stripe = require('stripe')('sk_test_51KieLTJtGs2pvcvr3vZLeAOLvdP3zcrWMhlxww4LsdfXAstCKEC6n9RqaWkAqmowNHG7d1WJOWcZAzOVd1SrcSuN00xl2HobvF')
const uuid = require('uuid')

class CartController {
    async addToCart(req, res) {
        let data = await Cart.findOne({
            where: {
                productId: req.body.id,
                userId: req?.user?.id
            }
        })
        if (data) {
            await Cart.update({
                count: data.count + 1
            },
                {
                    where: {
                        productId: req.body.id,
                        userId: req?.user?.id
                    }
                })
            res.send('added to cart')
        }
        else {
            let cartData = await Cart.create({
                productId: req.body.id,
                userId: req?.user?.id
            })
            // console.log(cartData);
            res.send('added to cart')
        }
    }
    async myCart(req, res) {
        let myCart = await Cart.findAll({
            where: {
                userId: req?.user?.id
            },
            include: { all: true, nested: true }
        })
        res.send(myCart);
        // console.log(myCart);
    }
    async removeFromCart(req, res) {
        let deleted = await Cart.destroy({
            where: {
                id: req.body.id
            }
        })
        let myCart = await Cart.findAll({
            where: { userId: req?.user?.id },
            include: { all: true, nested: true }
        })
        res.send(myCart);
    }
    async checkOut(req, res) {
        const { product, token } = req.body;
        console.log(req.user);
        const cart = await Cart.findAll({
            where: {
                userId: req?.user?.id,
            },
            include: { all: true, nested: true },
        });
        let total = 0;
        cart.forEach((el) => (total += el.count * el.product.price));
        const idempontencyKey = uuid.v4();
        stripe.customers.create({
            email: token.email,
            source: token.id,
        }).then((customer) =>
            stripe.charges.create({
                amount: total * 100,
                currency: "usd",
                customer: customer.id,
            })
        ).then(async () => {
            await Cart.destroy({
                where: { userId: req?.user?.id },
            });
            let order = await Orders.create({
                userId: req.user.id,
                total: total,
            });
            cart.forEach(async (el) => {
                el.product.count -= el.count;
                el.product.save();
                await Order_Details.create({
                    orderId: order.id,
                    productId: el.product.id,
                    count: el.count,
                    feedback: "",
                });
            });
            console.log(req.body);
            let allcarts = await Cart.findAll({
                where: { userId: req?.user?.id },
                include: { all: true, nested: true },
            });
            res.send({ allcarts });
        })
            .catch((err) => console.log(err));
    }
}

module.exports = {
    CartController: new CartController
}