import axios from "axios";
import service from "../../services";
const state = {
  token: localStorage.getItem("token") || "",
  user: {
    username: localStorage.getItem("username") || "",
    system: localStorage.getItem("userSystem") || 1,
  },
};
const getters = {
  isLoggedIn: (state) => !!state.token,
  getUsername: (state) => state.user.username,
  getSystem: (state) => state.user.system,
};
const actions = {
  async login({ commit }, user) {
    await service.loginService
      .authUser(user)
      .then((resp) => {
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("username", resp.data.user.username);
        localStorage.setItem("userSystem", resp.data.user.system);
        axios.defaults.headers.common["Authorization"] = resp.data.token;
        commit("auth_success", resp.data);
      })
      .catch(() => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
      });
  },
  async simpleLogout({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit("simpleLogout");
        commit("setNotifications", []);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userSystem");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      } catch (err) {
        reject();
      }
    });
  },
};
const mutations = {
  auth_success(state, respons) {
    state.token = respons.token;
    state.user.username = respons.user.username;
    state.user.system = respons.user.system;
  },
  simpleLogout(state) {
    state.user = { username: "", password: "" };
    state.token = "";
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
