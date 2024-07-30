/** @format */

import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const API_PREFIX = process.env.REACT_APP_API_PREFIX;

const client = Axios.create({
  baseURL: API_PREFIX + "/kpi/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": API_PREFIX,
  },
});

const setAuthToken = (config) => {
  const access_token = window.localStorage.getItem(
    process.env.REACT_APP_ACCESS_TOKEN
  );
  if (access_token) {
    config.headers["x-auth-token"] = `bearer ${access_token}`;
    config.headers["x-user-url"] = window.location.href;
    config.headers["isMobile"] = false;
  }
  return config;
};

const refreshAccessToken = async () => {
  try {
    const res = await Axios.post(
      `${API_PREFIX}/kpi/v1/account/refreshToken`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          access_token: window.localStorage.getItem(
            process.env.REACT_APP_ACCESS_TOKEN
          ),
        },
      }
    );
    const newAccessToken = res.data.result;

    // Store new access token
    window.localStorage.setItem(
      process.env.REACT_APP_ACCESS_TOKEN,
      newAccessToken
    );
    return newAccessToken;
  } catch (error) {
    // Handle error (e.g., redirect to login)
    window.localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);
    window.localStorage.removeItem(process.env.REACT_APP_CURRENT_USER);
    window.location.href = "/";
    return null;
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

    // Handle 401 error
    if (response && response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops
      const accessToken = await refreshAccessToken();
      if (accessToken) {
        originalRequest.headers["x-auth-token"] = `bearer ${accessToken}`;
        return client(originalRequest);
      }
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
