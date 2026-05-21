import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";
import toast from "react-hot-toast";

import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../services/taskService";

import {
  getProjects,
} from "../services/projectService";

import {
  getUsers,
} from "../services/userService";

function Tasks() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin =
    user?.role === "Admin";


  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] =
    useState([]);

  const [users, setUsers] =
    useState([]);


  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      assignedTo: "",
      project: "",
      dueDate: "",
    });


  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const data = await getTasks();

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };


  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };


  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const data = await getUsers();

      setUsers(data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchTasks();

    if (isAdmin) {

      fetchProjects();

      fetchUsers();
    }

  }, []);


  // INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  // CREATE TASK
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      await createTask(formData);

      toast.success(
  "Task Created"
);

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        project: "",
        dueDate: "",
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    toast.error(
  "Task Creation Failed"
);
    }
  };


  // UPDATE STATUS
  const handleStatusChange =
  async (id, status) => {

    try {

      await updateTaskStatus(
        id,
        status
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  // DELETE TASK
  const handleDelete = async (
    id
  ) => {

    try {

      await deleteTask(id);
      toast.success(
  "Task Deleted"
);

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <Layout>

      <h1 className="
        text-3xl
        font-bold
        mb-6
      ">
        Tasks
      </h1>


      {/* ADMIN CREATE TASK */}

      {isAdmin && (

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
            Create Task
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Task Title"
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
            placeholder="Description"
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

          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
            "
          >

            <option value="">
              Select Member
            </option>

            {users
              .filter(
                (u) =>
                u.role === "Member"
              )
              .map((user) => (

                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>
              ))}

          </select>


          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
            "
          >

            <option value="">
              Select Project
            </option>

            {projects.map((project) => (

              <option
                key={project._id}
                value={project._id}
              >
                {project.title}
              </option>
            ))}

          </select>


          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
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
            Create Task
          </button>

        </form>
      )}


      {/* TASK LIST */}

      <div className="
        bg-white
        p-6
        rounded-2xl
        shadow
      ">

        <table className="w-full">

          <thead>

            <tr className="
              border-b
            ">

              <th className="p-3 text-left">
                Task
              </th>

              <th className="p-3 text-left">
                Project
              </th>

              <th className="p-3 text-left">
                Assigned
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Due Date
              </th>

              {isAdmin && (
                <th className="
                  p-3
                  text-left
                ">
                  Action
                </th>
              )}

            </tr>

          </thead>

          <tbody>
            {
  tasks.length === 0 && (

    <tr>

      <td
        colSpan="6"
        className="
          text-center
          p-6
          text-gray-500
        "
      >
        No Tasks Found
      </td>

    </tr>
  )
}
            {tasks.map((task) => (

              <tr
                key={task._id}
                className="border-b"
              >

                <td className="p-3">
                  {task.title}
                </td>

                <td className="p-3">
                  {task.project?.title}
                </td>

                <td className="p-3">
                  {task.assignedTo?.name}
                </td>

                <td className="p-3">

                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(
                        task._id,
                        e.target.value
                      )
                    }
                    className="
                      border
                      p-2
                      rounded
                    "
                  >

                    <option>
                      Pending
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Completed
                    </option>

                  </select>

                </td>

                <td className="p-3">

                  {
                    task.dueDate
                    ?.split("T")[0]
                  }

                </td>

                {isAdmin && (

                  <td className="p-3">

                    <button
                      onClick={() =>
                        handleDelete(
                          task._id
                        )
                      }
                      className="
                        bg-red-500
                        text-white
                        px-4
                        py-2
                        rounded
                      "
                    >
                      Delete
                    </button>

                  </td>
                )}

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default Tasks;