const client = require("../db/dbConfig");
const moment = require("moment");
const createHttpError = require("http-errors");
const { stat } = require("fs");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class OrderItemModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.description = data.description;
    this.modified = moment.utc().toISOString();
    this.name = data.name;
    this.price = data.price || 0;
    this.id_product = data.id_product;
    this.qtd = data.qtd || 1;
    this.id_order = data.id_order || null;
  }

  static async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "orders_item") + "RETURNING *";

      const response = await client.query(statement);

      if (response.rows?.length) {
        return response.rows[0];
      }

      return null;
    } catch (err) {
      throw createHttpError(500, err);
    }
  }

  static async find(idOrder) {
    try {
      const statement = `SELECT oi.qtd, oi.id_order as "cartItemId", p.*
                                FROM "orders_item" oi 
                                INNER JOIN products p ON p.id = oi.id_product
                                WHERE id_order = $1`;
      const values = [idOrder];
      const response = await client.query(statement, values);

      if (response.rows?.length) {
        return response.rows;
      }

      return [];
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
};
