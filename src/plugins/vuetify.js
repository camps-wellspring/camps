import Vue from "vue";
import Vuetify from "vuetify/lib";
import ChangeDirection from "@/helpers/ChangeDirection";

Vue.use(Vuetify);

export default new Vuetify({
  rtl: ChangeDirection(),
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        accent: "#82B1F2",
        primary: "#1976D2",
        secondary: "#424242",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  }
});
