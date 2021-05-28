import axios from "axios";
import store from "../store";

async function createTask() {
  return axios.get(
    store.getters.backendURL + "/actions/user/notinumber/" 
  );
}


export default {
  createTask
};
