<template>
  <WrappingComponent :settings="settings" :formData="form" />
</template>

<script>
export default {
  name: "Global",
  props: {
    settings: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    WrappingComponent: () => import("./WrappingComponent")
  },

  data() {
    return {
      form: {
        global_start_project_description: "",
        global_subscription_description: "",
        global_contact_location_1: "",
        global_contact_location_2: ""
      }
    };
  }
};
</script>
