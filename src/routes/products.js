const express = require("express")
const router = express.Router();

const ProductsServices = require("../services/ProductService");
const ProductServiceInstance = new ProductsServices();

module.exports = (app) => {
    app.use("/products", router);

    router.get("/products", async (req, res, next) => {
        
    })
}