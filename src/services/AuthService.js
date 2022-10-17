const createError = require("http-errors");
const { emailExists, createUser, matchPassword } = require("./UsersService");

module.exports = class AuthService {
  async signup(data) {
    const { email, password } = data;
    console.log(email);
    try {
      const userExists = await emailExists(email);
      console.log(userExists);
      if (userExists) {
        return createError(409, `Email já existe`);
      }
      const user = createUser(email, password);
      console.log
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async login(data) {
    const { email, password } = data;

    try {
      const user = await emailExists(email);
      if (user.email != email) {
        throw createError(401, "Email ou senha incorreto");
      }
      const passwordCompare = await matchPassword(email, password);
      if (!passwordCompare) {
        throw createError(401, "Email ou senha incorreto 2");
      }
      return user;
    } catch (err) {
      throw (500, err);
    }
  }
};
