<template>
  <WrappingComponent :settings="settings" :formData="form" />
</template>

<script>
export default {
  name: "HomePage",
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
        home_hero_title: "",
        home_hero_description: "",
        home_our_store_description: "",
        home_our_works: ""
      }
    };
  }
};
</script>
