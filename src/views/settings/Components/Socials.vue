<template>
  <form-wrapper :validator="$v.form">
    <v-row>
      <v-col cols="12" md="6" v-for="social in $v.form.socials.$each.$iter" :key="social.id">
        <form-group name="socials" :validator="social.url">
          <v-text-field
            slot-scope="{ attrs }"
            v-bind="attrs"
            outlined
            :label="$t(`label.${social.$model.icon}`)"
            v-model="social.$model.url"
            @input="social.url.$touch()"
          ></v-text-field>
        </form-group>
        <v-btn
          :loading="loadingBtn"
          :disabled="social.url.$invalid"
          class="primary"
          @click.prevent="handleSubmit"
          >{{ $t("button.save") }}</v-btn
        >
      </v-col>
    </v-row>
  </form-wrapper>
</template>

<script>
import { url } from "vuelidate/lib/validators";
import { StoreData } from "@/helpers/apiMethods";

export default {
  name: "Socials",
  props: {
    settings: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loadingBtn: false,
      form: {
        socials: [
          { id: 1, url: "", icon: "facebook" },
          { id: 2, url: "", icon: "twitter" },
          { id: 3, url: "", icon: "linkedin" },
          { id: 4, url: "", icon: "youtube" },
          { id: 5, url: "", icon: "snapchat" },
          { id: 6, url: "", icon: "instagram" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      const formData = new FormData();
      const { socials } = this.form;
      socials.map((el, index) => {
        const { url } = el;
        if (url !== "") {
          formData.append(`socials[${index}][id]`, el.id);
          formData.append(`socials[${index}][url]`, el.url);
        }
      });
      StoreData({ reqName: "settings", data: formData })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err))
        .finally(() => (this.loadingBtn = false));
    },
    selectedSettings(settings, type) {
      const setting = settings[type];
      if (setting) {
        // important
        setting.forEach(setting => {
          this.form.socials.forEach((social, index) => {
            if (social.id === setting.id) {
              this.$set(this.form.socials, index, setting);
            }
          });
        });
      }
    }
  },
  validations() {
    return {
      form: {
        socials: {
          $each: {
            url: {
              url
            }
          }
        }
      }
    };
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          this.selectedSettings(settings, "socials");
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
