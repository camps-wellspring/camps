<template>
  <div>
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.settings") }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <component :settings="settingsObject" :is="components"></component>
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

    socials_page: () => import("./Components/Socials")
  },
  data() {
    return {
      components: "",
      settings: [],
      settingsObject: {}
    };
  },
  mounted() {
    this.getSettings();
  },
  methods: {
    getSettings(locale = "en") {
      IndexData({ reqName: "settings", query: { pagination: "all" }, locale })
        .then(res => {
          const { data } = res.data;
          this.settingsObject = data.reduce((acc, current) => {
            acc[current.type] = current.value;
            return acc;
          }, {});

          this.settings = data;
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    locale() {
      return this.$store.getters.locale;
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.components = route.name;
      },
      immediate: true
    },
    locale: {
      handler(locale) {
        if (locale !== undefined) {
          this.getSettings(locale);
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
