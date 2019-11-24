import Vue from "vue";
const validationErrors = Vue.observable({
  err: ""
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
    // console.log(vnode.context.$store);
    const {
      value: { inputValue, max, min }
    } = bind;

    if (inputValue.length < min) {
      el.style.border = "1px solid rgb(197, 89, 0)";
      //   validationErrors.err = `this field must be more than ${min} characters`;
    } else if (inputValue.length > max) {
      el.style.border = "1px solid rgb(197, 89, 0)";
      //   validationErrors.err = `this field must be less than ${max} characters`;
    } else {
      el.style.border = "1px solid transparent";
      //   validationErrors.err = "";
    }
  }
});
