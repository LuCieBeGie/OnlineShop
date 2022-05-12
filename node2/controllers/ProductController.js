const { User, Product, Photo, Cart } = require('../models');

class ProductController {
    async addProduct(req, res) {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            count: req.body.count,
            description: req.body.description,
            userId: req.user.id
        })
        req.files.forEach(async function (el) {
            await Photo.create({ url: el.filename, productId: product.id })
        })
        // console.log(product);
        res.send('saved successfully')
    }
    async myProducts(req, res) {
        let products = await Product.findAll({
            where: { userId: req.user.id }, include: Photo
        })
        // console.log(products);
        if (!products) {
            res.send('nothing to show')
        }
        res.send(products);
    }
    async prodInfo(req, res) {
        let product = await Product.findOne({ where: { id: req.body.id }, include: [Photo] })
        // console.log(product);
        res.send({ product })
    }
    async allProducts(req, res) {
        let allProd = await Product.findAll({ include: { all: true, nested: true } })
        // console.log(allProd);
        if (!allProd) {
            res.send('nothing to show')
        }
        res.send(allProd)
    }
}

module.exports = {
    ProductController: new ProductController
}