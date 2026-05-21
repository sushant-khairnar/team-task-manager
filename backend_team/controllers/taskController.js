const Task = require("../models/Task");


// CREATE TASK
const createTask = async (
  req,
  res
) => {

  try {

    const {
      title,
      description,
      assignedTo,
      project,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      project,
      dueDate,
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET TASKS
const getTasks = async (
  req,
  res
) => {

  try {

    let tasks;

    // ADMIN → ALL TASKS
    if (req.user.role === "Admin") {

      tasks = await Task.find()
        .populate("assignedTo", "name")
        .populate("project", "title");

    } else {

      // MEMBER → ONLY OWN TASKS
      tasks = await Task.find({
        assignedTo: req.user.id,
      })
      .populate("assignedTo", "name")
      .populate("project", "title");
    }

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK STATUS
const updateTaskStatus = async (
  req,
  res
) => {

  try {

    const { status } = req.body;

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });
    }

    // MEMBER CAN UPDATE ONLY OWN TASK
    if (
      req.user.role === "Member" &&
      task.assignedTo.toString() !== req.user.id
    ) {

      return res.status(403).json({
        message: "Access Denied",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE TASK
const deleteTask = async (
  req,
  res
) => {

  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};