<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="loginUser">
      <md-card>
        <md-card-header>
          <div class="md-title">Log in</div>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label for="email">Email</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="username"
            />
            <span class="md-error">The email is required</span>
            <span class="md-error">Invalid email</span>
          </md-field>
          <md-field>
            <label>Password </label>
            <md-input type="password" v-model="password"></md-input>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button to="/register" type="submit" class="md-primary"
            >Register</md-button
          >
          <md-button type="submit" class="md-primary" 
            >Log in</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser(e) {
      e.preventDefault();
      this.login({
        username: this.username,
        password: this.password
      }).then(() => {
        this.$router.push("/")
        });
    },
  },
};
</script>

<style>
.md-card {
  width: 500px;
  margin-top: 10%;
  margin-left: 30%;
  float: none;
  margin-bottom: 10px;
}
.md-title {
  justify-content: center;
}
</style>