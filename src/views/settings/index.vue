<template>
  <div>
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.settings") }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <component :settings="settings" :is="components"></component>
  </div>
</template>

<script>
import { IndexData } from "@/helpers/apiMethods";
export default {
  name: "Settings",
  components: {
    global: () => import("./Components/Global"),
    home_page: () => import("./Components/HomePage"),
    about_page: () => import("./Components/AboutUs"),
    contact_page: () => import("./Components/ContactPage"),
    managers_page: () => import("./Components/ManagersPage"),
    service_page: () => import("./Components/ServicePage"),
    socials_page: () => import("./Components/Socials")
  },
  data() {
    return {
      components: "",
      settings: []
    };
  },
  mounted() {
    this.getSettings();
  },
  methods: {
    getSettings() {
      IndexData({ reqName: "settings", query: { pagination: "all" } })
        .then(res => {
          const { data } = res.data;
          this.settings = data;
        })
        .catch(err => console.log(err));
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.components = route.name;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
