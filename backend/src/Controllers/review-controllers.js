const productsModel = require("../Models/produts-model");
const reviewModel = require("../Models/review-model");

const writeReview = async (req, res) => {
  try {
    const { comment, rating, productId, userId } = req.body;
    if (!comment || !rating || !productId || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(rating)) {
      return res.status(400).json({ message: "Rating must be a valid number" });
    }

    const existingReview = await reviewModel.findOne({ productId, userId });

    if (existingReview) {
      existingReview.comment = comment;
      existingReview.rating = Number(rating); // Convert rating to a number
      await existingReview.save();
    } else {
      const newReview = new reviewModel({
        comment,
        rating: Number(rating), // Convert rating to a number
        productId,
        userId,
      });
      await newReview.save();
    }

    // Calculate the average rating
    const reviews = await reviewModel.find({ productId });
    if (reviews.length > 0) {
      const validRatings = reviews
        .map((review) => Number(review.rating))
        .filter((rating) => !isNaN(rating)); // Filter out invalid ratings

      if (validRatings.length > 0) {
        const totalRating = validRatings.reduce(
          (acc, rating) => acc + rating,
          0
        );
        const averageRating = totalRating / validRatings.length;

        const product = await productsModel.findById(productId);
        if (product) {
          product.rating = averageRating;
          await product.save({ validateBeforeSave: false });
        } else {
          return res.status(404).json({ message: "Product not found" });
        }
      }
    }

    res
      .status(201)
      .json({ message: "Review Created/Updated successfully", reviews });
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
      return res.status(404).json({ message: "User not found..." });
    }
    const reviewByUser = await reviewModel
      .find({ userId })
      .sort({ createdAt: -1 });
    if (reviewByUser.length <= 0) {
      return res.status(404).json({ message: "No review found by this user" });
    }
    res.status(200).json({ message: "All Reviews By this User", reviewByUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { writeReview, totalReviewsCounts, getReviewByUserId };
