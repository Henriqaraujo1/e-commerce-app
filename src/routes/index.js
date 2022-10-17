const authRouter = require('./auth');
const userRouter = require('./users')

module.exports = (app, passport) => {
    authRouter(app, passport);
    userRouter(app);
}