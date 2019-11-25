<template>
  <WrappingComponent :settings="settings" :formData="form" />
</template>

<script>
export default {
  name: "Managers",
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
        managers_description: ""
      }
    };
  }
};
</script>
