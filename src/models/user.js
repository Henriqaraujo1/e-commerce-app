const createHttpError = require("http-errors");
const client = require("../db/dbConfig");

const EncryptUtil = require("../utils/bcrypt");
const EncryptUtilInstance = new EncryptUtil();

module.exports = class UserModel {
  /**
   * @param {Object} data
   */
  async getInfoUser(email) {
    try {
      const value = email;
      const data = await client.query("SELECT * FROM users WHERE email=$1", [
        value,
      ]);
      console.log(data.rows?.length)
      if (data.rows?.length) {
        return data.rows[0];
      }

      return null;
    } catch (err) {
      throw createHttpError(500, err);
    }
  }

  async NewUser(data) {
    const { email, password } = data;
    const encryptPassword = await EncryptUtilInstance.encrypt(password);

    const newUser = await client.query(
      "INSERT INTO users(email, password) VALUES ($1, $2)",
      [email, encryptPassword]
    );
    console.log(newUser.rows[0])
    if (newUser.rows?.length) {
      return newUser.rows[0];
    }

    return null;
  }

  async matchPassword(email, password) {
    try {
      const userPassword = this.getInfoUser(email);
      if (userPassword.rowCount == 0) {
        return false;
      }

      const userDbPassword = userPassword.rows[0].password;

      const match = await EncryptUtilInstance.comparePassword(password, userDbPassword);
      // console.log(match)
      return match;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async getUserById(id) {
    try {
      const value = parseInt(id);
      const userId = client.query(
        `SELECT * FROM users WHERE id_user = ${value}`
      );
      if (userId.rows?.length) {
        return userId.rows[0];
      }

      return null;
    } catch (err) {
      throw createError(404);
    }
  }

  async getAllUsers() {
    try {
      client.query(
        "SELECT * FROM users ORDER BY id_user ASC",
        (err, results) => {
          if (err) {
            throw err;
          } else if (results.rows?.length) {
            return results.rows[0];
          }
        }
      );
    } catch (err) {
      throw createError(500, err);
    }
  }
};
