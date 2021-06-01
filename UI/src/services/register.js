import axios from "axios";
import store from "../store";

async function createUser(payload) {
  return axios.post(store.getters.backendURL + "users/", {
    ...payload
  });
}

export default {
    createUser,
  };