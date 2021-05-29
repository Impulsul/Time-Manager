import axios from "axios";
import store from "../store";

async function createMeetings(payload) {
  return axios.post(store.getters.backendURL + "meetings/", {
    ...payload
  });
}

async function getUsersMeetings() {
  return axios.get(store.getters.backendURL + "meetings/");
}

async function deleteMeetings(id) {
  return axios.delete(store.getters.backendURL + "meetings/" + id);
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
