const express = require("express");
const {
  cerateNewProduct,
  getAllProducts,
  getSingleProduct,
} = require("../Controllers/product-controllers");
const router = express.Router();

router.post("/cerate-product", cerateNewProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

module.exports = router;
