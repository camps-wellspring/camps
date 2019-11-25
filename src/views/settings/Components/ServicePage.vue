<template>
  <WrappingComponent :settings="settings" :formData="form" />
</template>

<script>
export default {
  name: "Services",
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
        service_description: ""
      }
    };
  }
};
</script>
