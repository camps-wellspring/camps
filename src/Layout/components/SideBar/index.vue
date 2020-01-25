<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      :right="isRight"
    >
      <v-list>
        <sidebar-item
          v-for="(route, index) in permission_routers"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        ></sidebar-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{ $t("heading.wsadmin") }}</span>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field> -->
      <div class="flex-grow-1"></div>
      <!-- <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn> -->
      <!-- <v-btn icon title="language">
        <v-icon @click="handleChangeLanguage">mdi-earth</v-icon>
      </v-btn> -->
      <v-btn icon large @click="logout" title="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import cookie from "js-cookie";
// import { mapGetters } from "vuex";
// import SidebarItem from "./SideBarItem";

export default {
  props: {
    source: String
  },
  components: {
    // SidebarItem
  },
  computed: {
    isRight() {
      if (cookie.get("language") === "ar") {
        return true;
      } else {
        return false;
      }
    }
    // ...mapGetters(["permission_routers"])
  },
  data: () => ({
    dialog: false,
    drawer: null
  }),
  methods: {
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    handleChangeLanguage() {
      const lang = cookie.get("language");

      if (lang === "ar") {
        this.changeCookie("en");
      } else {
        this.changeCookie("ar");
      }
    },
    changeCookie(lang) {
      cookie.set("language", lang);
      window.location.reload();
    }
  }
};
</script>
