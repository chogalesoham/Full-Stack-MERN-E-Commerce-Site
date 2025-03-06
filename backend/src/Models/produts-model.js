const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    image: { type: String },
    color: { type: String },
    rating: { type: Number, default: 0 },
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const productsModel = mongoose.model("Prodcut", productsSchema);

module.exports = productsModel;
