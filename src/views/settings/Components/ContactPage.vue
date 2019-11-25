<template>
  <v-container>
    <form>
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12">
            <Editor :form="form" fieldName="contact_description" />
          </v-col>
        </v-row>
      </form-wrapper>
    </form>
    <ContactsComponent :settings="settings" />
  </v-container>
</template>

<script>
import { numeric, url, email } from "vuelidate/lib/validators";
// import { maxWords } from "@/utils/validate";

export default {
  name: "Contacts",

  props: {
    settings: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Editor: () => import("../Editor"),
    ContactsComponent: () => import("../ContactsComponent")
  },
  provide() {
    return {
      $v: this.$v
    };
  },
  data() {
    return {
      form: {
        contact_description: ""
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
      contact_description: {}
    }
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          this.selectedSettings(settings, "contact_description");
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
