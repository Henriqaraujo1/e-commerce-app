const createHttpError = require("http-errors");
const client = require("../db/dbConfig");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartItemModel {
  static async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "cart_item") + "RETURTNING *";
      const response = await client.query(statement);

      if (response.rows?.length) {
        return response.rows[0];
      }
      return null;
    } catch (err) {
      throw createHttpError(500, err);
    }
  }

  static async update(id, data) {
    try {
      const condition = pgp.as.format(
        "WHERE id_cart_item = ${id} RETURNING *",
        { id }
      );
      const statement = pgp.helpers.update(data, null, "cart_item") + condition;

      const response = await client.query(statement);

      if (response.rows?.length) {
        return response.rows[0];
      }

      return null;
    } catch (err) {
      throw createHttpError(500, err);
    }
  }

  static async find(idCart) {
    try {
      const statement =
        'SELECT ci.qtd, ci.id_cart_item as "cartItemId",p.* FROM cart_item ci';
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
};
