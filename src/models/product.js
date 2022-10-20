const client = require("../db/dbConfig");
const createHttpError = require("http-errors");

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
  async newProduct(data) {
    try {
      const {
        name,
        perc_sell,
        price_buy,
        price_sell,
        min_stock,
        max_stock,
        id_categoria,
        status,
      } = data;
      const products = await client.query(
        "INSERT INTO products (name, perc_sell, price_buy, price_sell, min_stock, max_stock, id_categoria, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          name,
          perc_sell,
          price_buy,
          price_sell,
          min_stock,
          max_stock,
          id_categoria,
          status,
        ]
      );

      if (products.rows?.length) {
        return products.rows;
      }
    } catch (err) {
      throw createError(500, err);
    }
  }
  async updateProdutct(data) {
    try {
      const {
        id,
        name,
        perc_sell,
        price_buy,
        price_sell,
        min_stock,
        max_stock,
        id_categoria,
        status,
      } = data;
      const upProduct = await client.query(
        "SELECT * FROM products WHERE id_products = $1",
        [
          id,
          name,
          perc_sell,
          price_buy,
          price_sell,
          min_stock,
          max_stock,
          id_categoria,
          status,
        ]
      );
      if (upProduct.rows?.length) {
        return upProduct.rows;
      }
    } catch (err) {
      throw createError(500, err);
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
};
