const express = require("express");
const {
  writeReview,
  totalReviewsCounts,
  getReviewByUserId,
} = require("../Controllers/review-controllers");
const router = express.Router();

//All Review Routes
router.post("/write-review", writeReview);
router.get("/total-reviews", totalReviewsCounts);
router.get("/:userId", getReviewByUserId);

module.exports = router;
