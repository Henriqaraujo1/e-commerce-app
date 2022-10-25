const client = require("../db/dbConfig");
const createHttpError = require("http-errors");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class ProductService {
  constructor(data = {}) {
    this.name = data.name;
    this.perc_sell = data.perc_sell;
    this.price_buy = data.price_buy;
    this.price_sell = data.price_sell;
    this.min_stock = data.min_stock;
    this.max_stock = data.max_stock;
    this.id_categoria = data.id_categoria;
    this.status = data.status;
  }

  async getInfoProduct(data = {}) {
    try {
      const result = await client.query("SELECT * FROM products");

      if (result.rows?.length) {
        return result.rows;
      }
    } catch (err) {
      throw createHttpError(500, err);
    }
  }

  async findProductId(data) {
    try {
      const id = data;
      const resultProductId = await client.query(
        `SELECT * FROM products WHERE id_products = ${id}`
      );

      if (resultProductId.rows?.length) {
        return resultProductId.rows;
      }
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
  async createProduct() {
    try {
      const { items, ...product } = this;

      const statement =
        pgp.helpers.insert(product, null, "products") + " RETURNING *";

      const response = await client.query(statement);

      if (result.rows?.length) {
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

  async createBrand(data) {
    const brand = data;

    try {
      const statement = pgp.helpers.insert(brand, null, 'category');

      const response = await client.query(statement);
      console.log(response)
      if(response.rows?.length) {
        response.rows[0]
      }

      
    } catch (err) {
      throw createHttpError(500, err)
    }
  }
};
