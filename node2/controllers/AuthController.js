const bcrypt = require("bcrypt")
const salt = 10
const Sequelize = require('sequelize')
const passport = require("passport")
const { User, Product, Photo, Cart } = require('../models');

class AuthController {
    addUser(req, res) {
        let data = req.body.user
        let error = false
        if (data.password != data.password_confirm) {
            error = true
            res.send('check password')
        }
        else {
            delete data.password_confirm
            bcrypt.hash(data.password, salt, async function (err, hash) {
                data.password = hash
                await User.create(data)
                res.send('user saved successfully')
            })
        }// console.log(data);
    }
    logIn(req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (user) {
                req.logIn(user, (err) => {
                    if (err) {
                        res.send({ error: err.message })
                    }
                    res.send({ status: 'ok' })
                })
            }
            else {
                res.send({ error: 'User is not found' })
            }
        })(req, res, next)
    }
    async logOut(req, res, next) {
        req.logOut()
        res.send('ok')
    }
}

module.exports = { AuthController: new AuthController }