const client = require("../db/dbConfig");

const createError = require("http-errors");

const UserModel = require("../models/user");
const UserModelInstance = new UserModel();
const EncryptUtil = require("../utils/bcrypt");
const EncryptUtilInstance = new EncryptUtil();

module.exports = class UsersService {
  async getEmail(data) {
    try {
      const {value} = data;
      console.log(data);
      const userInfo = UserModelInstance.getInfoUser(value);
      if(value === userInfo) {
        return false
      } else {
        const newUser = UserModelInstance.NewUser(value)
      }
      console.log(userInfo);
    } catch (err) {
      throw createError(500, err);
    }
  }

  async createUser(data) {

  }
};
