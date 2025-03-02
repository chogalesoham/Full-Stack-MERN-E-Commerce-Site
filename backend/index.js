const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;
const connectDB = require("./src/config/db");

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ mesaage: "Full-Satck (MERN) E-Commers Site BackEnd" });
});

app.listen(PORT, () => {
  console.log(`Server Start at: ${PORT}`);
});
