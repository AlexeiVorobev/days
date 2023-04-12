const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUserTags,
  updateUserTags
} = require("../controllers/userController");
const {protect} = require('../middleware/authMiddleware')

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/tags", protect, getUserTags);
router.put("/tags", protect, updateUserTags)

module.exports = router;
