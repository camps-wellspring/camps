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
import ToggleService from "@/components/ToggleService";
import WrappingTable from "@/components/WrappingTable";
import TextField from "@/components/TextField";
import VideoUpload from "@/components/VideoUpload";

import { SweetAlert } from "@/helpers/mixins/SweetAlert.js";
import VueSweetalert2 from "vue-sweetalert2";
import NoData from "@/components/NoData";
import ReadMore from "vue-read-more";
import "./directives";
import { messages } from "@/lang";
import { imagePreviewMixin } from "@/utils/mixins/imagePreview/imagePreviewMixin";
Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
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
Vue.use(ReadMore);

// Mixins -----------------------------------------------
Vue.mixin(SweetAlert);
Vue.mixin(imagePreviewMixin);
Vue.use(require("vue-moment"));
// Components -------------------------------------------
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
Vue.component("upload-video", VideoUpload);
Vue.component("NoData", NoData);
Vue.component("DialogComponent", DialogComponent);
Vue.component("toggle-service", ToggleService);
Vue.component("TextField", TextField);
Vue.component("WrappingTable", WrappingTable);

Vue.filter("truncate", function(value, strCount = 50) {
  if (!value) {
    return "";
  }

  return value.length > strCount
    ? value.substring(0, strCount) + "..."
    : value.substring(0, strCount);
});

window.eventBus = new Vue();
