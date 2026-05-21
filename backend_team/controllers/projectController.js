const Project = require("../models/Project");


// CREATE PROJECT
const createProject = async (
  req,
  res
) => {

  try {

    const {
      title,
      description,
    } = req.body;

    const project =
      await Project.create({
        title,
        description,
        createdBy: req.user.id,
      });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET PROJECTS
const getProjects = async (
  req,
  res
) => {

  try {

    const projects =
      await Project.find()
      .populate("createdBy", "name");

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};