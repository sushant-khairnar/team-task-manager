const express = require("express");

const protect = require(
  "../middleware/authMiddleware"
);

const {
  createProject,
  getProjects,
} = require(
  "../controllers/projectController"
);

const authorizeRoles = require(
  "../middleware/roleMiddleware"
);

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("Admin"),
  createProject
);

router.get(
  "/",
  protect,
  authorizeRoles("Admin"),
  getProjects
);

module.exports = router;