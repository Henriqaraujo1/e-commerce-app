const express = require("express");
const router = express.Router();

const ProductsServices = require("../services/ProductService");
const ProductServiceInstance = new ProductsServices();

module.exports = (app) => {
  app.use("/products", router);

  router.get("/", async (req, res, next) => {
    try {
      const response = await ProductServiceInstance.findProduct();
      if(response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({messageError: "Erro ao carregar os produtos"})
      }
      
    } catch (err) {
      next(err);
    }
  });

  router.get("/:productId", async (req, res, next) => {
    try {
      const productId = req.params.id;

      const response = await ProductServiceInstance.findProductId(productId);
      if (response) {
        res.status(201).json(response);
      }
      if (response === undefined) {
        res.status(404).json({ MessageError: "Product not register" });
      }
    } catch (err) {
      next(err);
    }
  });

  router.post("/newproduct", async (req, res, next) => {
    const { ...product } = req.body;

    const response = await ProductServiceInstance.newProduct(product);

    if(response) {
      res.status(200).json({message: 'Produto adicionado com sucesso'})
    } else {
      res.status(409).json({ message: 'Produto já existe'})
    }
    
  });

  router.post("/newcategory", async (req, res, next) => {
    try {
      const brand = req.body;

      const response = await ProductServiceInstance.newBrand(brand);
      if (response) {
        res.status(200).json({ message: "Categoria Criada com sucesso" });
      } else {
        res.status(409).json({ message: `Categoria já existe` });
      }
    } catch (err) {
      next(err);
    }
  });

  router.put("/updateproduct", async (req, res, next) => {});
  router.delete("/deleteproduct/:productId", async (req, res, next) => {});
};
