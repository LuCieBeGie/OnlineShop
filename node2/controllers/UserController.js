const { User, Product, Photo, Cart } = require('../models');

class UserController {
    async profile(req, res) {
        res.send({ user: req.user })
    }
    async UserCheck(req, res) {
        if (req.user) {
            res.send('true')
        }
        else {
            res.send('false')
        }
    }
}

module.exports = {
    UserController: new UserController
}