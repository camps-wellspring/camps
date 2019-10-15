import Vue from "vue";
import Vuelidate from "vuelidate";
import vuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";
import FormGroup from "@/components/FormGroup";
import CustomButton from "@/components/CustomButton";
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
Vue.component("NoData", NoData);
