const authRouter = require('./auth');
const userRouter = require('./users')
const productsRouter = require('./products');

module.exports = (app, passport) => {
    authRouter(app, passport);
    userRouter(app);
    productsRouter(app)
}