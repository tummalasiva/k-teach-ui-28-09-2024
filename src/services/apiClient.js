/** @format */

import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const API_PREFIX = process.env.REACT_APP_API_PREFIX;

const client = Axios.create({
  baseURL: "http://localhost:5000/ecamps/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5000",
  },
});

const setAuthToken = (config) => {
  const access_token = window.localStorage.getItem("access_token");
  if (access_token) {
    config.headers["x-auth-token"] = `bearer ${access_token}`;
  }
  return config;
};

const refreshAccessToken = async () => {
  try {
    const res = await client.post("/refresh-token");
    const newAccessToken = res.data.accessToken;
    // Store new access token
    window.localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    // Handle error (e.g., redirect to login)
    console.log("refresh token error", error);
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("current_user");
    window.location.href = "/login";
  }
};

client.interceptors.request.use(setAuthToken, (error) => Promise.reject(error));

client.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    if (data.message && ["post", "put", "delete"].includes(config.method)) {
      toast.success(data.message.split("_").join(" "));
    }
    return response;
  },
  async (error) => {
    const { response } = error;
    const originalRequest = error.config;
    if (response && response.status === 401) {
      // originalRequest._retry = true;
      // const accessToken = await refreshAccessToken();
      // originalRequest.headers["x-auth-token"] = `bearer ${accessToken}`;
      // return Axios(originalRequest);
    }
    if (response && response.data && response.data.message) {
      toast.error(response.data.message);
    } else {
      console.log(error);
      toast.error(
        (response && response.data && response.data.message) ||
          "An error occurred."
      );
    }
    return Promise.reject(error);
  }
);

export default client;
