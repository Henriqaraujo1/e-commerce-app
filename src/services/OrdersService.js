const createError = require("http-errors");
const OrderModel = require("../models/order");
const OrderItemModel = require("../models/orderItem");

module.exports = class OrderService {
  async create(data) {
    const { idUser, ...total } = data;
    try {
      const Order = new OrderModel();
      const order = await Order.create({ idUser, total });

      return order;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async list(idUser) {
    try {
      const orders = await OrderModel.findByUser(idUser);

      return orders;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async findByUser(idOrder) {
    try {
      const order = await OrderModel.findById(idOrder);
      return order;
    } catch (err) {
      throw createError(500, err);
    }
  }
};
