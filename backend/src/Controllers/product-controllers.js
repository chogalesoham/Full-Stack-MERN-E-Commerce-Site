const productsModel = require("../Models/produts-model");
const reviewModel = require("../Models/review-model");

//app new product
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

//get all products
const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    if (color && color !== "all") {
      filter.color = color;
    }
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await productsModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    const products = await productsModel
      .find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "get All Products",
      products,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single Product
const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productsModel
      .findById(productId)
      .populate("author", "email username");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const reviews = await reviewModel
      .find({ productId })
      .populate("userId", "username email");

    res
      .status(200)
      .json({ message: "Get Single Product by Id", product, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { cerateNewProduct, getAllProducts, getSingleProduct };
