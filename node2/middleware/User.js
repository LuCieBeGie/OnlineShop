function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.send('Please sign in first')
    }
}

module.exports = {
    authenticationMiddleware
}