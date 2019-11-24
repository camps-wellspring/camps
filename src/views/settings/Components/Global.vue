<template>
  <v-container>
    <form>
      <v-col cols="6" class="mx-auto">
        <locale-select @change="fireLocaleChange" />
      </v-col>
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12" md="6">
            <Editor
              :language="locale"
              :form="form"
              fieldName="global_start_project_description"
            />
          </v-col>
          <v-col cols="12" md="6">
            <Editor
              :language="locale"
              :form="form"
              fieldName="global_subscription_description"
            />
          </v-col>
          <v-col cols="12" md="6">
            <Editor
              :language="locale"
              :form="form"
              fieldName="global_contact_location_1"
            />
          </v-col>
          <v-col cols="12" md="6">
            <Editor
              :language="locale"
              :form="form"
              fieldName="global_contact_location_2"
            />
          </v-col>
        </v-row>
      </form-wrapper>
    </form>
  </v-container>
</template>

<script>
// import { minLength } from "vuelidate/lib/validators";
// import { maxWords } from "@/utils/validate";
import Cookies from "js-cookie";

export default {
  name: "Global",
  props: {
    settings: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Editor: () => import("../Editor")
  },
  provide() {
    return {
      $v: this.$v
    };
  },
  data() {
    return {
      form: {
        global_start_project_description: "",
        global_subscription_description: "",
        global_contact_location_1: "",
        global_contact_location_2: ""
      },
      locale: Cookies.get("language")
    };
  },
  methods: {
    fireLocaleChange(locale) {
      this.locale = locale;

      this.$emit("change_language", locale);
    },
    selectedSettings(settings, type) {
      const setting = settings[type];
      if (setting) {
        this.form[type] = setting;
      }
    }
  },
  validations: {
    form: {
      global_start_project_description: {}
    }
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          this.selectedSettings(settings, "global_start_project_description");
          this.selectedSettings(settings, "global_subscription_description");
          this.selectedSettings(settings, "global_contact_location_1");
          this.selectedSettings(settings, "global_contact_location_2");
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
