const createError = require("http-errors");
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class AuthService {
  async signup(data) {
    const { email, password } = data;
    try {
      const userExists = await UserModelInstance.getInfoUser(email);
      console.log(userExists);
      if (userExists) {
        return createError(409, `Email já existe`);
      }
      const user = await UserModelInstance.createUser(data);
      console.log(user);
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async login(data) {
    const { email, password } = data;

    try {
      const user = await UserModelInstance.getInfoUser(email);
      if (user.email != email) {
        throw createError(401, "Email ou senha incorreto");
      }
      const passwordCompare = await UserModelInstance.matchPassword(email, password);
      if (!passwordCompare) {
        throw createError(401, "Email ou senha incorreto 2");
      }
      return user;
    } catch (err) {
      throw (500, err);
    }
  }
};
