const express = require("express");
const {
  ragisterUser,
  loginUser,
  logoutUser,
  deleteUser,
  getAllUser,
  updateUserRole,
  editProfile,
} = require("../Controllers/user-controllers");
const verifyToken = require("../Middleware/verify-token");
const router = express.Router();

//Rigister User
router.post("/auth/register", ragisterUser);
router.post("/auth/login", loginUser);

//Logout user
router.post("/auth/logout", logoutUser);

//delete user
router.delete("/auth/user/:id", deleteUser);

//get all users
router.get("/auth/users", getAllUser);

//update user role
router.put("/auth/user/:id", updateUserRole);

//edit or update profile
router.patch("/auth/edit-profile", editProfile);

module.exports = router;
