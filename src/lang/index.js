import Vue from "vue";
import VueI18n from "vue-i18n";
import enLocale from "./en.json";
import arLocale from "./ar.json";
import Cookies from "js-cookie";

Vue.use(VueI18n);

export const messages = {
  en: {
    ...enLocale
  },
  ar: {
    ...arLocale
  }
};
const validationKeys = {
  maxWords: {
    // Validation rule name in vuelidate
    validationKey: "maxWord", // Validation key inside our deep messages object, Laravel shown here.
    params: [
      {
        vue: "maxWord", // Vuelidate param name
        ext: "maxWord" // Parameter inside the message
      }
    ]
  }
};
const i18n = new VueI18n({
  // set locale
  // options: en | ar
  locale: Cookies.get("language") || "en",
  fallbackLocale: "en",
  // set locale messages
  messages,
  validationKeys
});

export default i18n;
