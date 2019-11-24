<template>
  <v-container>
    <form>
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12">
            <Editor :form="form" fieldName="managers_description" />
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
  name: "Managers",
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
        managers_description: ""
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
      managers_description: {}
    }
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          this.selectedSettings(settings, "managers_description");
        }
      },
      immediate: true
    }
  }
};
</script>
