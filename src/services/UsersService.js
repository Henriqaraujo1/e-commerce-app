const client = require("../db/dbConfig");

const createError = require("http-errors");


const UserModel = require('../models/user');
const UserModelInstance = new UserModel();
const EncryptUtil = require("../utils/bcrypt");
const EncryptUtilInstance = new EncryptUtil();


module.exports = class UsersService {
  async getEmail(email) {
    try {
      const value = email
      const userInfo = UserModelInstance.getInfoUser(email)
      console.log(userInfo);
    } catch (err) {
      throw createError(500, err)
    }
  }

  async createUser(email, password) {

  }

  
}
