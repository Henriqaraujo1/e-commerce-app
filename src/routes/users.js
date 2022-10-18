const express = require("express");
const { use } = require("passport");
const passport = require("passport");
const router = express.Router();

const UsersService = require('../services/UsersService')
const UsersServiceInstance = new UsersService();

module.exports = (app, passport) => {
    app.use("/users", router);

    // router.get("/", UsersServiceInstance.getAllUsers)
    
    router.get("/:userId", async (req, res, next) => {
        const userId = req.params.id;

        const response = await UsersServiceInstance.getUserById(userId)

        if(response) {
            res.status(200).json(response)
        } else {
            res.status(404).json({MessageError: "User not found"})
        }
    })
}
