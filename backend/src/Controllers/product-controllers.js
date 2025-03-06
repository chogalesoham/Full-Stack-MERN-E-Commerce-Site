const productsModel = require("../Models/produts-model");
const reviewModel = require("../Models/review-model");

const cerateNewProduct = async (req, res) => {
  try {
    const newProduct = new productsModel({
      ...req.body,
    });
    const saveProduct = await newProduct.save();

    //calculate reviews
    const reviews = await reviewModel.find({ productId: saveProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      saveProduct.rating = averageRating;
      await saveProduct.save();
    }
    res.status(201).json({ message: "Product Created", newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { cerateNewProduct };
