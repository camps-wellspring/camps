import Cookies from "js-cookie";

const locale = {
  state: {
    locale: Cookies.get("language") || "en"
  },
  mutations: {
    SET_LOCALE(state, payload) {
      state.locale = payload;
    },
    RESET_LOCALE(state) {
      state.locale = Cookies.get("language") || "en";
    }
  }
};

export default locale;
