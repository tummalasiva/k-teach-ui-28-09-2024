/** @format */

import client from "./apiClient";

export const get = async (url, config) => {
  const res = await client.get(url, config);
  return res;
};
export const post = async (url, body, config) => {
  const res = await client.post(url, body, config);
  return res;
};
export const del = async (url, config) => {
  const res = await client.delete(url, config);
  return res;
};
export const put = async (url, body, config) => {
  const res = await client.put(url, body, config);
  return res;
};
