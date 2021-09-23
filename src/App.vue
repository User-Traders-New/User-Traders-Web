<template>
  <v-app>
    <v-content>
    <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import User from "./components/User.vue";
import Login from "./views/Login.vue"
import SignUp from "./views/SignUp.vue"

export default {
  name: "App",
  components: {
    User,
    Login,
    SignUp
  }
};
</script>
