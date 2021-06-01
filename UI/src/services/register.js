import axios from "axios";
import store from "../store";

async function createUser(payload) {
  return axios.post(store.getters.backendURL + "users/", {
    ...payload
  });
}

async function getAllUsers() {
  return axios.get(store.getters.backendURL + 'users/all/')
}

export default {
    createUser,
    getAllUsers
  };