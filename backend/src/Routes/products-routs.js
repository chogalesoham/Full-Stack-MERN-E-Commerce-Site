const express = require("express");
const {
  cerateNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  SingleProductRelatedProducts,
  getTrendingProducts,
} = require("../Controllers/product-controllers");
const verifyToken = require("../Middleware/verify-token");
const verifyAdmin = require("../Middleware/verify-admin");
const router = express.Router();

router.post("/cerate-product", verifyToken, verifyAdmin, cerateNewProduct);
router.get("/", getAllProducts);
router.get("/tranding", getTrendingProducts);
router.get("/:id", getSingleProduct);
router.patch("/update/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteProduct);
router.get("/related/:id", SingleProductRelatedProducts);

module.exports = router;
