const client = require("../db/dbConfig");
const createError = require("http-errors");

module.exports = class ProductService {
  async findProduct(options) {
    try {
      client.query(
        "SELECT * FROM products ORDER BY id_prod",
        (err, products) => {
          if (err) {
            throw createError(404, "Not Found");
          } else {
            res.status(201).json(products.rows);
          }
        }
      );
    } catch (err) {
      throw createError(500, err);
    }
  }

  async findProductId(data) {
    const id = data;
    client.query(
      `SELECT * FROM products WHERE id_product = ${id}`,
      (err, productId) => {
        try {
          if (err) {
            return createError(404, err);
          }
          if (productId.rows?.length) {
            return productId.rows[0];
          }
          return null;
        } catch (err) {
          throw createError(500, err);
        }
      }
    );
  }

  async newProduct(data) {
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
    try {
      client.query(
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
        ],
        (err, results) => {
          if (err) {
            throw new Error(err);
          }
          if (results.rows?.length) {
            return results.rows[0];
          } else {
            return createError(400, "BAD REQUEST");
          }
        }
      );
    } catch (err) {
      throw createError(500, err);
    }
  }

  async updateProdutct(data) {
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

    try {
      client.query(
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
        ],
        (err, upProduct) => {
          if (err) {
            throw createError(401, "Bad Request");
          }
          if (upProduct.rows?.length) {
            return upProduct.rows[0];
          }
        }
      );
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
