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

// get trending products
const getTrendingProducts = async (req, res) => {
  try {
    const products = await productsModel
      .find()
      .limit(20)
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Trending Products", products });
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

//update product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateProduct = await productsModel.findByIdAndUpdate(
      productId,
      { ...req.body },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", updateProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const detetedProduct = productsModel.findByIdAndDelete(productId);
    if (!detetedProduct) {
      return res.status(404).json({ message: "Product Not found" });
    }
    await reviewModel.deleteMany({ productId: productId });
    res
      .status(200)
      .json({ message: "Product deleted succsefull", productId: productId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get related product
const SingleProductRelatedProducts = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "product id not found" });
    }
    const product = await productsModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );
    const relatedProducts = await productsModel.find({
      _id: { $ne: id },
      $or: [{ name: { $regex: titleRegex } }, { category: product.category }],
    });

    res.status(200).json({ message: "Related Products", relatedProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  cerateNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  SingleProductRelatedProducts,
  getTrendingProducts,
};
