import axios from "axios";
import store from "../store";

function authUser(user) {
  return axios.get(store.getters.backendURL + `auth`, {
    auth: {
      username: user.username,
      password: user.password,
    },
  });
}

export default {
  authUser,
};
