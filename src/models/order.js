const createHttpError = require("http-errors");
const moment = require("moment");
const client = require("../db/dbConfig");
const pgp = require("pg-promise")({ capSQL: true });
const OrderItem = require("./orderItem");

module.exports = class OrderModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.items = data.items || [];
    this.modified = moment.utc().toISOString();
    this.status = data.status || "PENDING";
    this.total = data.total || 0;
    this.id_user = data.id_user || null;
  }

  addItems(items) {
    this.items = items.map((item) => new OrderItem(item));
  }

  async create() {
    try {
      const { items, ...order } = this;

      const statement =
        pgp.helpers.insert(order, null, "orders") + " RETURNING *";

      const response = await client.query(statement);

      if (response.rows?.length) {
        Object.assign(this, response.rows[0]);
      }

      return null;
    } catch (err) {
      throw createHttpError(500, err);
    }
  }

  async update(data) {
    try {
      const condition = pgp.as.format("WHERE id={id} RETURNING *", {
        id: this.id,
      });
      const statement = pgp.helpers.update(data, null, "orders") + condition;
      const response = await client.query(statement);

      if (response.rows?.length) {
        return response.rows[0];
      }

      return null;
    } catch (err) {
      throw createHttpError(500, err);
    }
  }

  static async findByUser(idUser) {
    try {
      const statement = "SELECT * FROM orders WHERE id_user = $1";

      const values = [idUser];

      const response = await client.query(statement, values);

      if (response.rows?.length) {
        return response.rows[0];
      }

      return null;
    } catch (err) {
      throw createHttpError(500, err);
    }
  }

  static async findById(idOrder) {
    try {
      const statement = "SELECT * FROM orders WHERE id =$1";
      const values = [idOrder];

      const response = await client.query(statement, values);

      if (response.rows?.length) {
        return response.rows[0];
      }

      return null;
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
};
