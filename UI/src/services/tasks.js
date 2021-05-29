import axios from "axios";
import store from "../store";

async function createTask(payload) {
  return axios.post(store.getters.backendURL + "tasks/", {
    ...payload
  });
}

async function getUsersTasks() {
  return axios.get(store.getters.backendURL + "tasks/");
}

async function deleteTask(id) {
  return axios.delete(store.getters.backendURL + "tasks/" + id);
}

async function updateTask(id, state) {
  return axios.put(store.getters.backendURL + 'tasks/' + id +'/state/' + state )
}
export default {
  createTask,
  getUsersTasks,
  deleteTask,
  updateTask
};
