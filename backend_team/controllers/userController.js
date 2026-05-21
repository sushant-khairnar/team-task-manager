const User = require("../models/User");

const Task = require("../models/Task");


// GET USERS WITH TASK COUNT
const getUsers = async (
  req,
  res
) => {

  try {

    const users = await User.find()
      .select("-password");

    // ADD TASK COUNT
    const usersWithTasks =
      await Promise.all(

      users.map(async (user) => {

        const taskCount =
          await Task.countDocuments({
            assignedTo: user._id,
          });

        return {
          ...user._doc,
          totalTasks: taskCount,
        };
      })
    );

    res.status(200).json(
      usersWithTasks
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
};