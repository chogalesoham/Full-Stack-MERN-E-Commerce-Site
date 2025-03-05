const generateToken = require("../Middleware/ganerate-token");
const User = require("../Models/user-model");

// Register User
const ragisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "Register User" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await userExist.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await generateToken(userExist._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.json({
      message: "Login User Successfully",
      token,
      userExist: {
        _id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        role: userExist.role,
        profileImage: userExist.profileImage,
        profession: userExist.profession,
        bio: userExist.bio,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Logout user
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    res.status(200).json({ message: "USer deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update User role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//edit profile
const editProfile = async (req, res) => {
  try {
    const { userId, username, profileImage, bio, profession } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username !== undefined) user.username = username;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        profession: user.profession,
        bio: user.bio,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  ragisterUser,
  loginUser,
  logoutUser,
  deleteUser,
  getAllUser,
  updateUserRole,
  editProfile,
};
