import axios from "axios";

const API_URL =
  "https://crudcrud.com/api/ea9a497554d047df90ab5dc902b58102/passwords";

export const getPasswords = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPassword = async (password) => {
  const response = await axios.post(API_URL, password);
  return response.data;
};

export const updatePassword = async (id, password) => {
  const response = await axios.put(`${API_URL}/${id}`, password);
  return response.data;
};

export const deletePassword = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
