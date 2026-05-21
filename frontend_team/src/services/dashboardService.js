import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/dashboard`;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getDashboardStats =
async () => {

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