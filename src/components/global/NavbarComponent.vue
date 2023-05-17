<template>
  <div class="d-flex justify-center pa-6 py-3 bg-black">
    <v-btn
      class="mx-2 bg-deep-purple-accent-1"
      @click="login"
      v-if="!isAuthenticated"
      >Login</v-btn
    >
    <v-btn class="mx-2 bg-lime-lighten-5" @click="logout" v-if="isAuthenticated"
      >Logout</v-btn
    >
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch("login");
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.userIsAuthenticated;
    },
  },
};
</script>
