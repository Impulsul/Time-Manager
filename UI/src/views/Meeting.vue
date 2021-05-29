<template>
  <div>
    <md-bottom-bar md-type="shift">
      <md-bottom-bar-item
        to="/"
        exact
        md-label="List"
        md-icon="list"
      ></md-bottom-bar-item>
      <md-bottom-bar-item
        to="/add"
        md-label="Add"
        md-icon="add"
      ></md-bottom-bar-item>
      <md-bottom-bar-item
        to="/meeting"
        md-label="Create meeting"
        md-icon="group"
      ></md-bottom-bar-item>
      <md-bottom-bar-item
        to="/auth"
        md-label="Log out"
        md-icon="home"
        @click="logout"
      ></md-bottom-bar-item>
    </md-bottom-bar>
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Meeting</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="task-name">Name</label>
              <md-input name="task-name" id="task-name" v-model="taskName" />
            </md-field>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="last-name">Description</label>
                <md-textarea v-model="description"></md-textarea>
              </md-field>
            </div>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="startDate">Start Date</label>
              <md-datepicker v-model="startDate" />
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="endDate">End Date</label>
              <md-datepicker v-model="endDate" />
            </md-field>
          </div>

        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary" @click="createTask">Create Meeting</md-button>
        </md-card-actions>
      </md-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import tasksService from "../services/tasks";
export default {
  name: "Date",
  data: () => ({
    taskName: "",
    description: "",
    startDate:null,
    endDate: null,
    selectedDate: null,
    form: {
      hour: null,
    },
  }),
  computed: {},
  methods: {
    ...mapActions(["simpleLogout"]),
    logout() {
      this.simpleLogout();
    },
    createTask() {
      tasksService.createTask({
        name: this.taskName,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate
      }).then(() => {
         this.$router.push("/")
      })
    }
  },
};
</script>

<style >
.phone-viewport {
  overflow: hidden;
  border: 1px solid rgba(#000, 0.26);
  background: rgba(#000, 0.06);
}

.md-datepicker {
  margin-top: 1%;
  margin-right: 5%;
}

.md-button {
  margin-left: 50%;
  margin-top: 2%;
}
.md-card {
  width: 50%;
  display: block;
  margin: 10% 25%;
}
</style>
