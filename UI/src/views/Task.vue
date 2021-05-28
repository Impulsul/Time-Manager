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
        ></md-bottom-bar-item>
      </md-bottom-bar>
      <md-subheader style="display: inline-block; margin-top: 35px"
        >Tasks</md-subheader
      >
      <div v-for="task in tasks" :key="task.id">
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">{{ task.name }}</div>
              <div class="md-subhead">{{ task.start }}-{{ task.end }}</div>
            </md-card-header>

            <md-card-content>
              {{ task.description }}
            </md-card-content>

            <md-card-actions>
              <md-button>Delete</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </div>
      <md-subheader style="display: inline-block; margin-top: 35px">Meetings</md-subheader>
      <div
        v-for="meeting in meetings"
        :key="meeting.id"
      >
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">{{ meeting.name }}</div>
              <div class="md-subhead">
                {{ meeting.start }}-{{ meeting.end }}
              </div>
            </md-card-header>

            <md-card-content>
              {{ meeting.description }}
            </md-card-content>

            <md-card-actions>
              <md-button>Delete</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableSort",
  data: () => ({
    tasks: [
      {
        id: 1,
        name: "Spala rufe",
        description: "ia paine fa acum ca mor de foame",
        start: "la 7",
        end: "la 7:10",
      },
      {
        id: 2,
        name: "Cumpara lapte",
        description: "ia paine fa",
        start: "la 7",
        end: "la 7:10",
      },
      {
        id: 3,
        name: "Cumpara lapte",
        description: "ia paine fa",
        start: "la 7",
        end: "la 7:10",
      },
    ],
    meetings: [
      {
        id: 11,
        name: "Spala rufe",
        description: "ia paine fa acum ca mor de foame",
        start: "la 7",
        end: "la 7:10",
      },
      {
        id: 12,
        name: "Cumpara lapte",
        description: "ia paine fa",
        start: "la 7",
        end: "la 7:10",
      },
      {
        id: 13,
        name: "Cumpara lapte",
        description: "ia paine fa",
        start: "la 7",
        end: "la 7:10",
      },
    ],
  }),
  methods: {
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