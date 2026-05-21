import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/users`;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getUsers = async () => {

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