const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST',],
    }
});
io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('FormApi', { data: 'Anna' })
    socket.on('H1', function (data) {
        console.log(data);
    })
});
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt")
const passport = require("passport")
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/img')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

const LocalStrategy = require("passport-local").Strategy

const { authenticationMiddleware } = require('./middleware/User')
const { User, Product, Photo, Cart, Orders } = require('./models');
const { CartController } = require('./controllers/CartController');
const { UserController } = require('./controllers/UserController');
const { AuthController } = require('./controllers/AuthController');
const { ProductController } = require('./controllers/ProductController');
const { OrderController } = require('./controllers/OrderController');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'static')))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

passport.use(new LocalStrategy(
    async function (username, password, done) {
        let user = await User.findOne({ where: { email: username } });
        // console.log(user);
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password).then(function (result) {
            // console.log(result);
            if (!result) { return done(null, false); }
            return done(null, user);
        });
    }
))
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
    let user = await User.findByPk(id)
    done(null, user);
})

app.post('/users', AuthController.addUser)
app.post('/login', AuthController.logIn)
app.post('/logout', AuthController.logOut)
app.post('/profile', authenticationMiddleware(), UserController.profile)
app.post('/products', authenticationMiddleware(), upload.array('photo'), ProductController.addProduct)
app.post('/myProducts', authenticationMiddleware(), ProductController.myProducts)
app.post('/prodInfo', ProductController.prodInfo)
app.post('/allProducts', ProductController.allProducts)
app.post('/addToCart', authenticationMiddleware(), CartController.addToCart)
app.post('/userCheck', UserController.UserCheck)
app.post('/myCart', CartController.myCart)
app.post('/removeFromCart', CartController.removeFromCart)
app.post('/checkOut', authenticationMiddleware(), CartController.checkOut)
app.post('/myOrders', authenticationMiddleware(), OrderController.myOrders)

server.listen(4000)