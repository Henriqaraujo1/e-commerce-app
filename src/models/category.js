const client = require("../db/dbConfig");
const createHttpError = require("http-errors");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CategoryService {
  async getBrand(data) {
    try {
      const brand = data.name;
      console.log(brand);
      const compareBrand = await client.query(
        "SELECT * FROM category WHERE name = $1",
        [brand]
      );

      if (compareBrand === brand) {
        throw createHttpError(409, "Essa categoria já existe");
      } else {
        return compareBrand;
      }
    } catch (err) {
      throw createHttpError(409, "Categoria já criada");
    }
  }

  async createBrand(data) {
    try {
        const brand = data
        const oldBrand = await this.getBrand(brand)
      if (brand === getBrand.rows[0].name) {
        return createHttpError(409, "Essa categoria já existe");
      } else {
        const statement = pgp.helpers.insert(brand, null, "category");
        const response = await client.query(statement);
        if (response.rows?.length) {
          response.rows[0];
        }
      }
    } catch (err) {
      throw createHttpError(500, err);
    }
  }
};
