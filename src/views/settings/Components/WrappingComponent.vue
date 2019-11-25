<template>
  <v-container>
    <form>
      <v-col cols="6" class="mx-auto">
        <locale-select @change="fireLocaleChange" />
      </v-col>
      <form-wrapper :validator="$v.form">
        <v-row>
          <template v-for="fieldName in getFieldsKeys">
            <v-col cols="12" md="6" :key="fieldName">
              <Editor :language="locale" :form="form" :fieldName="fieldName" />
            </v-col>
          </template>
        </v-row>
      </form-wrapper>
    </form>
  </v-container>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "WrappingComponent",
  props: {
    settings: {
      type: Object,
      default: () => {}
    },
    formData: {
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
      form: { ...this.formData },
      locale: Cookies.get("language")
    };
  },
  methods: {
    fireLocaleChange(locale) {
      this.locale = locale;
      //   this.$emit("change_language", locale);
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
      about_description: {}
    }
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          this.getFieldsKeys.map(key => {
            this.selectedSettings(settings, key);
          });
        }
      },
      immediate: true
    }
  },
  computed: {
    getFieldsKeys() {
      return Object.keys(this.formData);
    }
  }
};
</script>
