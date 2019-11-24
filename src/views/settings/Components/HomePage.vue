<template>
  <v-container>
    <form>
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="home_hero_title" />
          </v-col>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="home_hero_description" />
          </v-col>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="home_our_store_description" />
          </v-col>
          <v-col cols="12" md="6">
            <Editor :form="form" fieldName="home_our_works" />
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
  name: "HomePage",
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
        home_hero_title: "",
        home_hero_description: "",
        home_our_store_description: "",
        home_our_works: ""
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
      home_hero_title: {}
    }
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          this.selectedSettings(settings, "home_hero_title");
          this.selectedSettings(settings, "home_hero_description");
          this.selectedSettings(settings, "home_our_store_description");
          this.selectedSettings(settings, "home_our_works");
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
