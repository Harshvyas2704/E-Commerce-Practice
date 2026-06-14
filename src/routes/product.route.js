const router = require("express").Router();
const {
  getProductListController,
  getProductDetailsController,
} = require("../controllers/product.controller.js");

router.get("/products", getProductListController);
router.get("/products/:slug", getProductDetailsController);

module.exports = { productRoute: router };
