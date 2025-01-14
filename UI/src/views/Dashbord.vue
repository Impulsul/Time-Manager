<template>
  <div>
    <div style="possition">
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
      <md-empty-state
        v-if="tasks.length == 0 && meetings.length == 0"
        style="margin: 10% 38%;"
        md-rounded
        md-icon="access_time"
        md-label="You don't have any task or meeting"
        md-description="Add a task or a meeting in order to show you those"
      >
      </md-empty-state>
      <div v-if="tasks.length != 0">
        <md-subheader style="display: block; margin-top: 35px; width: 100%"
          >Tasks</md-subheader
        >
        <div
          v-for="task in tasks"
          :key="task.id"
          style="display: block; width: 100%"
        >
          <md-card md-with-hover :class="generateClass(task.state)">
            <md-ripple>
              <md-card-header>
                <div class="md-title">{{ task.name }}</div>
                <div class="md-subhead">
                  {{ task.startDate }}-{{ task.endDate }}
                </div>
              </md-card-header>

              <md-card-content>
                {{ task.description }}
              </md-card-content>
              <md-card-actions class="inProgress">
                <md-button @click="inProgressTask($event, task.id)"
                  >In Progress</md-button
                >
              </md-card-actions>
              <md-card-actions class="done">
                <md-button @click="doneTask($event, task.id)">Done</md-button>
              </md-card-actions>
              <md-card-actions>
                <md-button @click="deleteTask($event, task.id)"
                  >Delete</md-button
                >
              </md-card-actions>
            </md-ripple>
          </md-card>
        </div>
      </div>
      <div v-if="meetings.length != 0">
        <md-subheader style="display: block; margin-top: 35px; width: 100%"
          >Meetings</md-subheader
        >
        <div v-for="meeting in meetings" :key="meeting.id" style="width: 100%">
          <md-card md-with-hover :class="generateClass(meeting.state)">
            <md-card-header>
              <div class="md-title">{{ meeting.name }}</div>
              <div class="md-subhead">
                Day {{ meeting.startDate }} - {{ meeting.duration }} Minutes
              </div>
              <div class="md-subhead">Created by {{ meeting.username }}</div>
            </md-card-header>

            <md-card-expand>
              <md-card-actions md-alignment="space-between">
                <div>
                  <md-button
                    class="inProgress"
                    @click="inProgressMeeting($event, meeting.id)"
                    >On Going</md-button
                  >
                  <md-button
                    class="done"
                    @click="doneMeeting($event, meeting.id)"
                    >Finished</md-button
                  >
                  <md-button @click="deleteMeeting($event, meeting.id)"
                    >Delete</md-button
                  >
                </div>

                <md-card-expand-trigger>
                  <md-button class="md-icon-button">
                    <md-icon>keyboard_arrow_down</md-icon>
                  </md-button>
                </md-card-expand-trigger>
              </md-card-actions>

              <md-card-expand-content>
                <md-card-content>
                  {{ meeting.description }}
                  <br />
                  <md-list
                    class="md-triple-line"
                    v-for="part in meeting.participants"
                    :key="part"
                  >
                    <md-list-item>
                      <span class="material-icons">
                        supervised_user_circle
                      </span>

                      <div class="md-list-item-text">
                        <span>{{ part }}</span>
                      </div>
                    </md-list-item>
                  </md-list>
                </md-card-content>
              </md-card-expand-content>
            </md-card-expand>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import tasksService from "../services/tasks";
import meetingsService from "../services/meetings";
export default {
  name: "TableSort",
  data: () => ({
    tasks: [],
    meetings: [],
  }),
  async mounted() {
    tasksService
      .getUsersTasks()
      .then((response) => {
        this.tasks = response.data;
      })
      .catch(() => (this.tasks = []));
    meetingsService
      .getUsersMeeting()
      .then((response) => {
        this.meetings = response.data;
      })
      .catch(() => (this.meetings = []));
  },
  methods: {
    ...mapActions(["simpleLogout"]),
    generateClass(state) {
      if (state == "inProgress" || state == "ongoing") {
        return "md-primary";
      } else if (state == "done" || state == "finished") {
        return "md-accent";
      } else return "";
    },
    onSelect(items) {
      this.selected = items;
    },
    getAlternateLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} user${plural} selected`;
    },
    logout() {
      this.simpleLogout();
    },
    async deleteTask(e, id) {
      e.preventDefault();
      await tasksService.deleteTask(id);
      const index = this.tasks.findIndex((obj) => obj.id == id);
      if (index !== -1) this.tasks.splice(index, 1);
    },
    inProgressTask(e, id) {
      e.preventDefault();
      tasksService.updateTask(id, "inProgress").then(() => {
        this.tasks.forEach((task) => {
          if (task.id == id) {
            task.state = "inProgress";
          }
        });
      });
    },

    doneTask(e, id) {
      e.preventDefault();
      tasksService.updateTask(id, "done").then(() => {
        this.tasks.forEach((task) => {
          if (task.id == id) {
            task.state = "done";
          }
        });
      });
    },

    async deleteMeeting(e, id) {
      e.preventDefault();
      await meetingsService.deleteMeeting(id);
      const index = this.meetings.findIndex((obj) => obj.id == id);
      if (index !== -1) this.meetings.splice(index, 1);
    },
    inProgressMeeting(e, id) {
      e.preventDefault();
      meetingsService.updateMeeting(id, "ongoing").then(() => {
        this.meetings.forEach((meeting) => {
          if (meeting.id == id) {
            meeting.state = "ongoing";
          }
        });
      });
    },

    doneMeeting(e, id) {
      e.preventDefault();
      meetingsService.updateMeeting(id, "finished").then(() => {
        this.meetings.forEach((meeting) => {
          if (meeting.id == id) {
            meeting.state = "finished";
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
md-bottom-bar-item {
  width: 20%;
}
.phone-viewport {
  overflow: hidden;
  border: 1px solid rgba(#000, 0.26);
  background: rgba(#000, 0.06);
}
.md-table {
  margin-left: 5%;
  margin-top: 5%;
  margin-right: 5%;
}
.md-title {
  margin-left: 45%;
}
.inProgress,
.done {
  float: left;
}
.md-card {
  width: 30%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  float: left;
  margin-left: 1.6%;
  margin-right: 1.6%;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>