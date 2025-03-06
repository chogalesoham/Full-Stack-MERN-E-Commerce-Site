const express = require("express");
const { cerateNewProduct } = require("../Controllers/product-controllers");
const router = express.Router();

//app new product
router.post("/cerate-product", cerateNewProduct);

module.exports = router;
