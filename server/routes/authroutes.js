const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  uploadAvatar,
  uploadAvatarMiddleware,
} = require("../controllers/authcontroller");

const auth = require("../middleware/authmiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected profile routes
router.get("/me", auth, getMe);
router.put("/me", auth, updateMe);
router.post("/me/avatar", auth, uploadAvatarMiddleware, uploadAvatar);

module.exports = router;
