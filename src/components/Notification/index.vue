<template>
  <v-snackbar
    top
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    :multi-line="true"
    :color="snackbar.color"
  >
    <span class="snack"> {{ snackbar.text }}</span>
    <v-btn text dark right @click="closeNotification">{{
      $t("button.close")
    }}</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar() {
      return this.$store.getters.notification;
    }
  },
  methods: {
    closeNotification() {
      this.$store.dispatch("CloseNotification");
    }
  }
};
</script>
