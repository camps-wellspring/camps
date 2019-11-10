<template>
  <v-container>
    <form-wrapper :validator="$v.form">
      <form @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <form-group name="name">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-bind="attrs"
                  :value="item.name"
                  outlined
                  :label="$t('label.name')"
                  @blur="$v.form.name.$touch()"
                  @input="form.name = $event"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>

          <v-col cols="12" md="6">
            <form-group name="url">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-bind="attrs"
                  :value="item.url"
                  outlined
                  :label="$t('label.url')"
                  @blur="$v.form.url.$touch()"
                  @input="form.url = $event"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>

          <v-col cols="12" md="6">
            <new-image-upload
              class="file-upload__image"
              :imgUrl="item.icon.path"
              @fileSelected="hadnleImg"
            />
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
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import { StoreData } from "@/helpers/apiMethods";

export default {
  data() {
    return {
      form: {
        name: "",
        url: "",
        icon: null
      },
      loading: {
        submit: false
      }
    };
  },

  props: {
    item: {
      type: Object,
      default: () => {}
    }
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
          url
        }
      }
    };
  },

  methods: {
    hadnleImg(img) {
      this.form.icon = img.file;
    },

    submit() {
      if (!this.$v.form.$invalid) {
        this.loading.submit = true;
        let payload = new FormData();
        for (const el in this.form) {
          payload.append(el, this.form[el]);
        }
        StoreData({ reqName: "technologies", data: payload })
          .then(() => {
            this.loading.submit = false;
          })
          .catch(() => (this.loading.submit = false));
      }
    }
  }
};
</script>
