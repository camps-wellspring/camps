import Vue from "vue";

Vue.directive("toggle-attr", {
  update(el, bind) {
    if (!bind.value) {
      el.setAttribute("multiple", "");
    } else {
      el.removeAttribute("multiple");
    }
  }
});
