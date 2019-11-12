<template>
  <v-container>
    <form-wrapper :validator="$v.form">
      <form @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <form-group name="name">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-model="form.name"
                  v-bind="attrs"
                  outlined
                  :label="$t('label.name')"
                  @blur="$v.form.name.$touch()"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>

          <v-col cols="12" md="6">
            <new-image-upload
              class="file-upload__image"
              @fileSelected="handleImg"
            />
          </v-col>

          <v-col cols="12" md="6">
            <form-group name="url">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-model="form.url"
                  outlined
                  :label="$t('label.url')"
                  @blur="$v.form.url.$touch()"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>

          <v-col cols="12">
            <v-btn
              type="submit"
              class="primary"
              :disabled="$v.form.$invalid"
              :loading="loading.submit"
              >{{ $t("button.submit") }}</v-btn
            >
          </v-col>
        </v-row>
      </form>
    </form-wrapper>
  </v-container>
</template>

<script>
import { url, required, minLength, maxLength } from "vuelidate/lib/validators";
import { StoreData } from "@/helpers/apiMethods";

export default {
  data() {
    return {
      form: {},
      loading: {
        submit: false
      }
    };
  },

  validations() {
    return {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(20)
        },
        url: {
          required,
          url
        },
        icon: {
          required
        }
      }
    };
  },

  methods: {
    handleImg(img) {
      this.form.icon = img.file;
      this.$v.form.icon.$touch();
    },

    handleColorChange(color) {
      this.form.color = color;
      this.$v.form.color.$touch();
    },

    submit() {
      this.loading.submit = true;
      let payload = new FormData();
      for (const el in this.form) {
        payload.append(el, this.form[el]);
      }
      StoreData({
        reqName: "technologies",
        data: payload
      })
        .then(() => {
          this.loading.submit = false;
          this.reset();
          this.$emit("closed");
        })
        .catch(() => (this.loading.submit = false));
    },

    reset() {
      this.form = {};
    }
  }
};
</script>
