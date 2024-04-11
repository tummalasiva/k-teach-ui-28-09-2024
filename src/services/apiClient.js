import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const API_PREFIX = process.env.REACT_APP_API_PREFIX;

const client = Axios.create({
  baseURL: API_PREFIX,
});

const setAuthToken = (config) => {
  const access_token = window.localStorage.getItem("access_token");
  if (access_token) {
    config.headers["x-auth-token"] = `bearer ${access_token}`;
  }
  return config;
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
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("current_inventory_user");
      window.location.href = "/";
    }
    if (response && response.data && response.data.message) {
      toast.error(response.data.message);
    } else {
      toast.error("An error occurred.");
    }
    return Promise.reject(error);
  }
);

export default client;
