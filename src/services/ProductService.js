const client = require("../db/dbConfig");
const createError = require("http-errors");

const ProductModel = require("../models/product");
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
  async newProduct(data) {
    const { ...newProducts } = data;

    try {
      const getProduct = await ProductModelInstance.findProductName(
        newProducts
      );
      // console.log(newProducts)
      if(getProduct === undefined) {
        console.log(newProducts);
        const Product = new ProductModel(newProducts);
        const product = await Product.createProduct();

        return product
      }
      
    } catch (err) {
      throw createError(500, err);
    }
  }

  async newBrand(data) {
    try {
      const brand = data;
      const getBrand = await ProductModelInstance.getBrand(brand);
      if (getBrand === undefined) {
        const createBrand = await ProductModelInstance.createBrand(brand);

        return createBrand;
      }
    } catch (err) {
      throw createError(500, err);
    }
  }
};

// async findProduct(options) {
//   try {
//     client.query(
//       "SELECT * FROM products ORDER BY id_prod",
//       (err, products) => {
//         if (err) {
//           throw createError(404, "Not Found");
//         } else {
//           res.status(201).json(products.rows);
//         }
//       }
//     );
//   } catch (err) {
//     throw createError(500, err);
//   }
// }

// async findProductId(data) {
//   const id = data;
//   client.query(
//     `SELECT * FROM products WHERE id_product = ${id}`,
//     (err, productId) => {
//       try {
//         if (err) {
//           return createError(404, err);
//         }
//         if (productId.rows?.length) {
//           return productId.rows[0];
//         }
//         return null;
//       } catch (err) {
//         throw createError(500, err);
//       }
//     }
//   );
// }
// async deleteProduct(id) {
//   const valueId = parseInt(id);
//   try {
//     client.query(
//       `DELETE * FROM products WHERE id_products = ${valueId}`,
//       (err, delProdutc) => {
//         if (err) {
//           return createError(404, "Product not find");
//         } else {
//           return `Product with id: ${delProdutc.rows[0].id}`;
//         }
//       }
//     );
//   } catch (err) {
//     return createError(500, err);
//   }
//   client.query;
// }
