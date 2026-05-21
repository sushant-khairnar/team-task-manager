import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/tasks`;


const getToken = () => {
  return localStorage.getItem("token");
};


// GET TASKS
export const getTasks = async () => {

  const response = await axios.get(
    API,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};


// CREATE TASK
export const createTask = async (
  taskData
) => {

  const response = await axios.post(
    API,
    taskData,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};


// UPDATE STATUS
export const updateTaskStatus =
async (id, status) => {

  const response = await axios.put(
    `${API}/${id}`,
    { status },
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};


// DELETE TASK
export const deleteTask = async (
  id
) => {

  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};