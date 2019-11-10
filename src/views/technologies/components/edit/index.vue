<template>
  <v-container>
    <locale-select @change="handleLocaleChange" />

    <form-wrapper :validator="$v.form">
      <form @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <form-group name="name">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-bind="attrs"
                  :value="item && item.name ? item.name : curItem.name"
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
                  :value="item && item.url ? item.url : curItem.url"
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
              :imgUrl="curItem.icon.path"
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
import { minLength, maxLength, url } from "vuelidate/lib/validators";
import { UpdateData, ShowData } from "@/helpers/apiMethods";

export default {
  props: {
    curItem: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      form: {},
      item: {},
      loading: {
        submit: false,
        fetch: false
      }
    };
  },

  validations() {
    return {
      form: {
        name: {
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
          console.log("TCL: submit -> this.form[el]", this.form[el]);
          payload.append(el, this.form[el]);
        }
        payload.append("_method", "put");
        UpdateData({
          reqName: "technologies",
          data: payload,
          id: this.curItem.id
        })
          .then(() => {
            this.loading.submit = false;
          })
          .catch(() => (this.loading.submit = false));
      }
    },

    handleLocaleChange(locale) {
      this.loading.fetch = true;
      this.locale = locale;
      ShowData({ reqName: "technologies", id: this.curItem.id, locale }).then(
        res => {
          console.log(
            "TCL: handleLocaleChange -> res.data.data",
            res.data.data
          );
          this.item = res.data.data;
          this.loading.fetch = false;
        }
      );
    }
  }
};
</script>
