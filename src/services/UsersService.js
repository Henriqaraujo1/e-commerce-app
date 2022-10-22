const client = require("../db/dbConfig");

const createError = require("http-errors");

const UserModel = require("../models/user");
const UserModelInstance = new UserModel();
const EncryptUtil = require("../utils/bcrypt");
const EncryptUtilInstance = new EncryptUtil();

module.exports = class UsersService {
  async getEmail(data) {
    try {
      const { value } = data;
      console.log(data);
      const userInfo = UserModelInstance.getInfoUser(value);
      if (value === userInfo) {
        return false;
      } else {
        const newUser = UserModelInstance.NewUser(value);
        return newUser;
      }
    } catch (err) {
      throw createError(500, err);
    }
  }

  async getUser(data) {
    const {id} = data;

    try {
      const user = await UserModelInstance.getUserById(id);

      if(!user) {
        throw createError(404, 'Usuario não encontrado')
      }
    } catch (err) {
      throw createError(500, err)
    }
  }
};
