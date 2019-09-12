<template>
  <side-bar></side-bar>
</template>

<script>
import SideBar from "./components/SideBar";
export default {
  name: "AppLayout",
  components: {
    SideBar
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.v-list {
  padding: 0;
}
</style>
