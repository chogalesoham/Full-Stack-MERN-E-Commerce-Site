const productsModel = require("../Models/produts-model");
const reviewModel = require("../Models/review-model");

const writeReview = async (req, res) => {
  try {
    const { comment, rating, productId, userId } = req.body;
    if (!comment || !rating || !productId || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingReview = await reviewModel.findOne({ productId, userId });

    if (existingReview) {
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      const newReview = new reviewModel({ comment, rating, productId, userId });
      await newReview.save();
    }

    //calulate the average rating
    const reviews = await reviewModel.find({ productId });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      const product = await productsModel.findById(productId);
      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    }
    res.status(201).json({ message: "Review Created...", reviews: reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const totalReviewsCounts = async (req, res) => {
  try {
    const totalReviews = await reviewModel.countDocuments({});
    res.status(200).json({ message: "Total Reviews Count", totalReviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(404).json({ message: "user not found..." });
    }
    const reviewByUser = await reviewModel
      .find({ userId })
      .sort({ createdAt: -1 });
    if (reviewByUser.length <= 0) {
      res.status(404).json({ message: "not review found by this user" });
    }
    res.status(200).json({ message: "All Review By this User", reviewByUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { writeReview, totalReviewsCounts, getReviewByUserId };
