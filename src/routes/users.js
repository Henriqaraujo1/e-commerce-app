const express = require("express");
const passport = require("passport");
const router = express.Router();
const {getAllUsers} = require("../services/UsersService");

module.exports = (app, passport) => {
    app.use("/users", router);

    router.get("/", getAllUsers)
}
