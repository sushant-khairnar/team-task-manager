import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";

import {
  getProjects,
  createProject,
} from "../services/projectService";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });


  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };


  // LOAD PROJECTS
  useEffect(() => {
    fetchProjects();
  }, []);


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // CREATE PROJECT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createProject(formData);

      toast.success(
  "Project Created"
);

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();

    } catch (error) {

      console.log(error);

      toast.error(
  "Project Creation Failed"
);
    }
  };

  return (
    <Layout>

      <div className="
        flex
        justify-between
        items-center
        mb-6
      ">

        <h1 className="
          text-3xl
          font-bold
        ">
          Projects
        </h1>

      </div>


      {/* CREATE FORM */}

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-6
          rounded-2xl
          shadow
          mb-8
        "
      >

        <h2 className="
          text-2xl
          font-bold
          mb-4
        ">
          Create Project
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <button
          type="submit"
          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          Create Project
        </button>

      </form>


      {/* PROJECT LIST */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
      ">

        {projects.map((project) => (

          <div
            key={project._id}
            className="
              bg-white
              p-6
              rounded-2xl
              shadow
            "
          >

            <h2 className="
              text-2xl
              font-bold
            ">
              {project.title}
            </h2>

            <p className="
              text-gray-600
              mt-3
            ">
              {project.description}
            </p>

            <p className="
              mt-4
              text-sm
              text-gray-500
            ">
              Created By:
              {" "}
              {project.createdBy?.name}
            </p>

          </div>
        ))}

      </div>

    </Layout>
  );
}

export default Projects;