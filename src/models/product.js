const client = require("../db/dbConfig");
const createHttpError = require("http-errors");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class ProductModel {
  constructor(data = {}) {
    this.name = data.name;
    this.perc_sell = data.perc_sell;
    this.price_buy = data.price_buy;
    this.price_sell;
    this.min_stock = data.min_stock;
    this.max_stock = data.max_stock;
    this.id_categoria = data.id_categoria;
    this.status = data.status;
  }

  async getProduct(data = {}) {
    try {
      const statement = "SELECT * FROM products ORDER BY id_product ASC";
      const response = await client.query(statement);

      if (response.rows?.length) {
        return response.rows;
      }
    } catch (err) {
      throw createHttpError(500, err);
    }
  }

  async findProductName(data) {
    try {
      const value = [data.name];
      const statement = "SELECT * FROM products WHERE name = $1";

      const response = await client.query(statement, value);
      console.log(response);
      if (response.rows?.length) {
        return response.rows[0];
      }
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
  async createProduct() {
    try {
      const newIncreaseValue = this.price_buy * (this.perc_sell / 100);
      console.log(newIncreaseValue);
      this.price_sell = this.price_buy + newIncreaseValue;
      console.log(this.price_sell);
      const data = { ...this };

      const statement =
        pgp.helpers.insert(data, null, "products") + " RETURNING *";

      const response = await client.query(statement);

      if (response.rows?.length) {
        Object.assign(this, response.rows[0]);
        return response.rows[0];
      }
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
  async updateProdutct(data) {
    try {
      const condition = pgp.as.format("WHERE id_product = ${id} RETURNING *", {
        id: this.id,
      });
      const statement = pgp.helpers.update(data, null, "products") + condition;

      const response = await client.query(statement);

      if (response.rows?.length) {
        return response.rows[0];
      }
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
  async deleteProduct(id) {
    const valueId = parseInt(id);
    try {
      client.query(
        `DELETE * FROM products WHERE id_products = ${valueId}`,
        (err, delProdutc) => {
          if (err) {
            return createError(404, "Product not find");
          } else {
            return `Product with id: ${delProdutc.rows[0].id}`;
          }
        }
      );
    } catch (err) {
      return createError(500, err);
    }
    client.query;
  }
  async getBrand(data) {
    try {
      const statement = "SELECT * FROM category WHERE name = $1";
      const value = [data.name];
      const response = await client.query(statement, value);

      if (response.rows?.length) {
        return response.rows[0];
      }
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
  async createBrand(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "category") + "RETURNING *";

      const response = await client.query(statement);

      if (response.rows?.length) {
        return response.rows[0];
      }
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
};
