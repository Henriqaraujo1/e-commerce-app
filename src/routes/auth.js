const express = require("express");
const router = express.Router();

const AuthService = require("../services/AuthService");
const AuthServiceInstance = new AuthService();
// const users = require('../services/UsersService');

const client = require("../db/dbConfig");
const user = require("../services/UsersService");
module.exports = (app, passport) => {
  app.use("/auth", router);

  router.get("/user", user.getAllUsers);

  router.post("/signup", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await AuthServiceInstance.signup(data);
      console.log('haha response');
      res
        .status(200)
        .json({ message: "usuario criado com sucesso", response: data.email });
    } catch (error) {
      res.status(409).send(`Email já existente`);
      next(error);
    }
  });

  router.post(
    "/signin",
    passport.authenticate("local"),
    async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const response = await AuthServiceInstance.login({
          email: email,
          password,
        });

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    }
  );
};
