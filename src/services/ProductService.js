const client = require("../db/dbConfig");
const createError = require("http-errors");

const ProductModel = require("../models/product");
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
  async findProduct() {
    try {
      const findProduct = ProductModelInstance.getProduct();
      if (!findProduct) {
        throw createError(404, "Produto não encontrado");
      } else {
        return findProduct;
      }
    } catch (err) {
      throw createError(500, err);
    }
  }
  async newProduct(data) {
    const { ...newProducts } = data;

    try {
      const getProduct = await ProductModelInstance.findProductName(
        newProducts
      );
      // console.log(newProducts)
      if (getProduct === undefined) {
        console.log(newProducts);
        const Product = new ProductModel(newProducts);
        const product = await Product.createProduct();

        return product;
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

  async findProductName(data) {
    try {
      const findProductName = await ProductModelInstance.findProductName(data);
      if (!findProductName) {
        throw createError(404, "Produto não encontrado");
      } else {
        return findProductName;
      }
    } catch (err) {
      throw createError(500, err);
    }
  }

  async deleteProduct(id) {
    try {
      const productId = await ProductModelInstance.deleteProduct(id)

      if(!productId) {
        throw(404, "Produto não encontrado")
      } else {
        return productId
      }
    } catch (err) {
      return createError(500, err);
    }
  }
};
