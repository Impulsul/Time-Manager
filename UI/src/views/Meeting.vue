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
            <label for="meeting-name">Name</label>
            <md-input
              name="meeting-name"
              id="meeting-name"
              v-model="meetingName"
            />
          </md-field>

          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="participants">Participants</label>
              <md-select v-model="participants" multiple>
                <md-option v-for="user in participantsList" :key="user.id" :value="user.username">{{user.username}}</md-option>
              </md-select>
              <!-- <md-input name="participants" id="participants" v-model="participants" /> -->
            </md-field>
          </div>
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
            <label for="duration">Duration</label>
            <md-input name="duration" id="duration" v-model="duration" />
          </md-field>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button type="submit" class="md-primary" @click="createMeeting"
          >Create Meeting</md-button
        >
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import registerService from "../services/register";
import meetingsService from "../services/meetings";
export default {
  name: "Date",
  data: () => ({
    participantsList: [],
    meetingName: "",
    description: "",
    participants: "",
    duration: "",
    startDate: null,
    selectedDate: null,
    form: {
      hour: null,
    },
  }),
  computed: {},
  async mounted()  {
    const users = await registerService.getAllUsers()
    this.participantsList = users.data
    console.log(this.participantsList)
  },
  methods: {
    ...mapActions(["simpleLogout"]),
    logout() {
      this.simpleLogout();
    },
    createMeeting() {
      this.participants = this.participants.filter(value => value != "")
      meetingsService
        .createMeeting({
          name: this.meetingName,
          participants: this.participants,
          startDate: this.startDate,
          duration: this.duration,
          description: this.description
        })
        .then(() => {
          this.$router.push("/");
        });
    },
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
