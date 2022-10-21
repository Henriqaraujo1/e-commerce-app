const createError = require("http-errors");
const CartModel = require("../models/cart");
const OrderModel = require("../models/order");
const CartItemModel = require("../models/cartItem");

module.exports = class CartService {
  async create(data) {
    const { idUser } = data;
    try {
      const Cart = new CartModel();
      const cart = await Cart.create(idUser);

      return cart;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async loadCart(idUser) {
    try {
      const cart = await CartModel.findOneByUser(idUser);

      const items = await CartItemModel.find(cart.id);
      cart.items = items;

      return cart;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async addItem(idUser, item) {
    try {
      const cart = await CartModel.findOneByUser(idUser);

      const cartItem = await CartItemModel.create({
        id_cart: cart.id,
        ...item,
      });

      return cartItem;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async removeItem(cartItemId) {
    try {
      const cartItem = await CartItemModel.delete(cartItemId, data);

      return cartItem;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async updateItem(cartItemId, data) {
    try {
      const cartItem = await CartItemModel.update(cartItemId, data);

      return cartItem;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async checkout(idCart, idUser, paymentInfo) {
    try {
      const stripe = require("stripe")("sk_test_FOY6txFJqPQvJJQxJ8jpeLYQ");

      const cartItems = await CartItemModel.find(idCart);

      const total = cartItems.reduce((total, item) => {
        return (total += Number(item.price));
      }, 0);

      const Order = new OrderModel({ total, idUser });
      Order.addItems(cartItems).Cart;
      await Order.create();

      const charge = await stripe.charges.create({
        amount: total,
        currency: "usd",
        source: paymentInfo.id,
        description: "Codecademy Charge",
      });

      const order = Order.update({ status: "COMPLETE" });

      return order;
    } catch (err) {
      throw createError(500, err);
    }
  }
};
