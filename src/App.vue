<template>
  <v-app>
    <notification />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Notification from "@/components/Notification";

export default {
  name: "App",
  components: {
    Notification
  }
};
</script>
