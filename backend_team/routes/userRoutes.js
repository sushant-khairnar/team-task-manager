const express = require("express");

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getUsers,
} = require(
  "../controllers/userController"
);

const router = express.Router();

router.get(
  "/",
  protect,
  getUsers
);

module.exports = router;