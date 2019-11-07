import Vue from "vue";
import Vuelidate from "vuelidate";
import * as VueGoogleMaps from "vue2-google-maps";
import vuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";
import FormGroup from "@/components/FormGroup";
import CustomButton from "@/components/CustomButton";
import GoogleMaps from "@/components/GoogleMaps";
import LocaleSelect from "@/components/LocaleSelect";
import CurrentPath from "./components/CurrentPath";
import GlobalToolbar from "@/components/GlobalToolbar";
import NewImageUpload from "@/components/NewImageUpload";
import multiImageUpload from "@/components/multiImageUpload";
import GlobalImagePreview from "@/components/GlobalImagePreview";
import DialogComponent from "@/components/DialogComponent";
import NoData from "@/components/NoData";

import { messages } from "@/lang";

Vue.use(Vuelidate);
Vue.use(VueGoogleMaps, {
  load: {
    // key: "AIzaSyBPocaJkDl6MtFaT4MF4C4saWVOiV1CJBs",
    // key: process.env.GOOGLE_MAP_API_KEY,
    libraries: "places"
  }
});
Vue.use(vuelidateErrorExtractor, {
  messages,
  i18n: "validation"
});

Vue.component("form-group", FormGroup);
Vue.component("formWrapper", templates.FormWrapper);
Vue.component("CustomButton", CustomButton);
Vue.component("google-maps", GoogleMaps);
Vue.component("current-path", CurrentPath);
Vue.component("locale-select", LocaleSelect);
Vue.component("global-toolbar", GlobalToolbar);
Vue.component("new-image-upload", NewImageUpload);
Vue.component("multi-image-upload", multiImageUpload);
Vue.component("global-image-preview", GlobalImagePreview);
Vue.component("NoData", NoData);
Vue.component("DialogComponent", DialogComponent);

Vue.filter("truncate", function(value, strCount = 50) {
  if (!value) {
    return "";
  }

  return value.substring(0, strCount) + "...";
});
