import Vue from "vue";
import Vuelidate from "vuelidate";
import vuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";
import FormGroup from "@/components/FormGroup";
import CustomButton from "@/components/CustomButton";
import GlobalToolbar from "@/components/GlobalToolbar";
import GlobalImagePreview from "@/components/GlobalImagePreview";
import NewImageUpload from "@/components/NewImageUpload";
import NoData from "@/components/NoData";

import { messages } from "@/lang";

Vue.use(Vuelidate);
Vue.use(vuelidateErrorExtractor, {
  messages,
  i18n: "validation"
});

Vue.component("form-group", FormGroup);
Vue.component("formWrapper", templates.FormWrapper);
Vue.component("CustomButton", CustomButton);
Vue.component("global-toolbar", GlobalToolbar);
Vue.component("global-image-preview", GlobalImagePreview);
Vue.component("new-image-upload", NewImageUpload);
Vue.component("NoData", NoData);
