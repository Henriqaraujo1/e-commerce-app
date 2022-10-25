const express = require("express");
const router = express.Router();

const AuthService = require("../services/AuthService");
const AuthServiceInstance = new AuthService();
// const users = require('../services/UsersService');

module.exports = (app, passport) => {
  app.use("/auth", router);

  router.post("/register", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await AuthServiceInstance.signup(data);
      console.log(response)
      res.status(200).json({
        message: `Usuario criado com sucesso, E-mail utilizado ${response}`,
      });
    } catch (err) {
      res.status(409).json(`Email Não encontrado`);
      next(err);
    }
  });

  router.post(
    "/login",
    passport.authenticate("local"),
    async (req, res, next) => {
      try {
        const { username, password } = req.body;
        const response = await AuthServiceInstance.login({
          email: username,
          password,
        });
        res.status(200).json({message: "login realizado"});
      } catch (err) {
        console.log("Login não foi realizado");
        next(err);
      }
    }
  );
};
