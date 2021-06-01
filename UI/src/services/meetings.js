import axios from "axios";
import store from "../store";

async function createMeeting(payload) {
  return axios.post(store.getters.backendURL + "meetings/", {
    ...payload
  });
}

async function getUsersMeeting() {
  return axios.get(store.getters.backendURL + "meetings/user");
}

async function deleteMeeting(id) {
  return axios.delete(store.getters.backendURL + "meetings/" + id);
}

async function updateMeeting(id, state) {
  return axios.put(store.getters.backendURL + 'meetings/' + id +'/state/' + state )
}
export default {
  createMeeting,
  getUsersMeeting,
  deleteMeeting,
  updateMeeting
};
