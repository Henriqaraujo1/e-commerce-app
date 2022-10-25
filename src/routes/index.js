const authRouter = require("./auth");
const userRouter = require("./users");
const productsRouter = require("./products");
const cartRouter = require("./cart");
const orderRouter = require("./orders");

module.exports = (app, passport) => {
  authRouter(app, passport);
  userRouter(app);
  productsRouter(app);
  cartRouter(app);
  orderRouter(app);
};
