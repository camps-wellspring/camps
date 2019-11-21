import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./lang"; // Internationalization
import "./permission";
import "./bootstrap";
import "./assets/scss/main.scss";
import Cookies from "js-cookie";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  created() {
    if (!Cookies.get("language")) {
      Cookies.set("language", "en");
    }
  },
  render: h => h(App)
}).$mount("#app");
