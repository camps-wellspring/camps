<template>
  <v-container>
    <form>
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="about_description" />
          </v-col>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="about_our_vision" />
          </v-col>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="about_our_mission" />
          </v-col>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="about_our_message" />
          </v-col>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="about_our_schedule" />
          </v-col>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="about_why_solutionplus" />
          </v-col>
        </v-row>
      </form-wrapper>
    </form>
  </v-container>
</template>

<script>
// import { minLength } from "vuelidate/lib/validators";
// import { maxWords } from "@/utils/validate";

export default {
  name: "AboutPage",
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
        about_description: "",
        about_our_vision: "",
        about_our_mission: "",
        about_our_message: "",
        about_our_schedule: "",
        about_why_solutionplus: ""
      }
    };
  },
  methods: {
    selectedSettings(settings, type) {
      const setting = settings[type];
      if (setting) {
        this.form[type] = setting;
      }
    }
  },
  validations: {
    form: {
      about_description: {}
    }
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          this.selectedSettings(settings, "about_description");
          this.selectedSettings(settings, "about_our_vision");
          this.selectedSettings(settings, "about_our_mission");
          this.selectedSettings(settings, "about_our_message");
          this.selectedSettings(settings, "about_our_schedule");
          this.selectedSettings(settings, "about_why_solutionplus");
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
