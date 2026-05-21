const express = require("express");

const protect = require(
  "../middleware/authMiddleware"
);

const authorizeRoles = require(
  "../middleware/roleMiddleware"
);

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require(
  "../controllers/taskController"
);

const router = express.Router();


// ADMIN CREATE TASK
router.post(
  "/",
  protect,
  authorizeRoles("Admin"),
  createTask
);


// GET TASKS
router.get(
  "/",
  protect,
  getTasks
);


// UPDATE STATUS
router.put(
  "/:id",
  protect,
  updateTaskStatus
);


// ADMIN DELETE TASK
router.delete(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  deleteTask
);

module.exports = router;