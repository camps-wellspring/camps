import Vue from "vue";
const validationErrors = Vue.observable({
  serverError: "",
  ErrorsKeys: []
});
Vue.mixin({
  data() {
    return {
      validationErrors
    };
  }
});
Vue.directive("toggle-attr", {
  update(el, bind) {
    if (!bind.value) {
      el.setAttribute("multiple", "");
    } else {
      el.removeAttribute("multiple");
    }
  }
});

Vue.directive("input-validation", {
  update(el, bind, vnode) {
    const {
      getters: { serverErrors }
    } = vnode.context.$store;
    const { value } = bind;

    if (serverErrors !== null) {
      if (validationErrors.ErrorsKeys.includes(value)) {
        el.style.border = "1px solid rgb(197, 89, 0)";
      } else {
        el.style.border = "1px solid transparent";
      }
      const ErrorsKeys = Object.keys(serverErrors);

      validationErrors.ErrorsKeys = ErrorsKeys;
      validationErrors.serverError = serverErrors[value][0];
    } else {
      validationErrors.ErrorsKeys = [];
      validationErrors.serverError = [];
      el.style.border = "1px solid transparent";
    }
  }
});
