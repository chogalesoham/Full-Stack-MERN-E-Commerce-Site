const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).json({ mesaage: "Full-Satck (MERN) E-Commers Site BackEnd" });
});

app.listen(PORT, () => {
  console.log(`Server Start at: ${PORT}`);
});
