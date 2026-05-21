import axios from "axios";

const API =  `${import.meta.env.VITE_API_URL}/projects`;


// GET TOKEN
const getToken = () => {
  return localStorage.getItem("token");
};


// GET ALL PROJECTS
export const getProjects = async () => {

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


// CREATE PROJECT
export const createProject = async (
  projectData
) => {

  const response = await axios.post(
    API,
    projectData,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};