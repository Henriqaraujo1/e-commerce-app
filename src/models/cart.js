const client = require("../db/dbConfig");
const moment = require("moment");
const createHttpError = require("http-errors");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.modified = moment.utc().toISOString();
    this.converted = data.converted || null;
    this.isActive = data.isActive || true;
  }

  async create(idUser) {
    try {
      const data = { idUser, ...this };

      const statement = pgp.helpers.insert(data, null, "carts") + "RETURNING *";

      const response = await client.query(statement);

      if (response.rows?.length) {
        return response.rows[0];
      }

      return null;
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
  static async findOneByUser(idUser) {
    try {
      const statement = "SELECT * FROM carts WHERE id_user = $1";
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

  static async findOneById(id) {
    try {
      const statement = "SELECT * FROM carts WHERE id = $1";
      const values = { id };
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
