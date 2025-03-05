const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;
const connectDB = require("./src/config/db");
const userRoutes = require("./src/Routes/user-route.js");

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ mesaage: "Full-Satck (MERN) E-Commers Site BackEnd" });
});

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server Start at: ${PORT}`);
});
