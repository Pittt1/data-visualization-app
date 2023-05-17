<template>
  <HomePage v-if="isAuthenticated" />
  <HomePageNoAuth v-if="!isAuthenticated" />
</template>

<script>
import HomePage from "@/components/HomePage.vue";
import HomePageNoAuth from "@/components/HomePageNoAuth.vue";

export default {
  components: {
    HomePage,
    HomePageNoAuth,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.userIsAuthenticated;
    },
  },
};
</script>
