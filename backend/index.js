const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;
const connectDB = require("./src/Config/db.js");
const userRoutes = require("./src/Routes/user-route.js");
const productsRoutes = require("./src/Routes/products-routs.js");
const reviewRoutes = require("./src/Routes/reviews-routes.js");

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://full-stack-mern-e-commerce-site-hfla.vercel.app",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ mesaage: "Full-Satck (MERN) E-Commers Site BackEnd" });
});

//Auth Routes
app.use("/api", userRoutes);

//Products Routes
app.use("/api/products", productsRoutes);

//Reviews Rouste
app.use("/api/review", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server Start at: ${PORT}`);
});
