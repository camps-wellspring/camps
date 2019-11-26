<template>
  <div>
    <WrappingComponent :settings="settings" :formData="form" />
    <ContactsComponent :settings="settings" />
  </div>
</template>

<script>
export default {
  name: "Contacts",
  props: {
    settings: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    WrappingComponent: () => import("./WrappingComponent"),
    ContactsComponent: () => import("../ContactsComponent")
  },

  data() {
    return {
      form: {
        contact_description: ""
      }
    };
  }
};
</script>
