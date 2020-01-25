import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import errors from "./modules/errors";
import notification from "./modules/notification";
// import permission from "./modules/permission";
import locale from "./modules/locale";

import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    errors,
    notification,
    // permission,

    locale
  },
  getters
});
