<template>
  <v-container>
    <form>
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="global_start_project_description" />
          </v-col>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="global_subscription_description" />
          </v-col>
        </v-row>
      </form-wrapper>
    </form>
  </v-container>
</template>

<script>
import { minLength } from "vuelidate/lib/validators";
import { maxWords } from "@/utils/validate";

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
        global_subscription_description: ""
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
      global_start_project_description: {
        minLength: minLength(3),
        maxWords: maxWords(100)
      }
    }
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          this.selectedSettings(settings, "global_start_project_description");
          this.selectedSettings(settings, "global_subscription_description");
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
