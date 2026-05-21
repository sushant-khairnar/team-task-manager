const Task = require("../models/Task");


// DASHBOARD STATS
const getDashboardStats =
async (req, res) => {

  try {

    let tasks;

    // ADMIN → ALL TASKS
    if (req.user.role === "Admin") {

      tasks = await Task.find()
        .populate("assignedTo", "name")
        .populate("project", "title");

    } else {

      // MEMBER → OWN TASKS
      tasks = await Task.find({
        assignedTo: req.user.id,
      })
      .populate("assignedTo", "name")
      .populate("project", "title");
    }


    // COUNTS
    const totalTasks =
      tasks.length;

    const completedTasks =
      tasks.filter(
        (task) =>
          task.status === "Completed"
      ).length;

    const pendingTasks =
      tasks.filter(
        (task) =>
          task.status !== "Completed"
      ).length;

    const overdueTasks =
      tasks.filter((task) => {

        return (
          task.dueDate &&
          new Date(task.dueDate)
          < new Date() &&
          task.status !== "Completed"
        );
      }).length;


    // RECENT TASKS
    const recentTasks =
      tasks.slice(-5).reverse();

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      recentTasks,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};