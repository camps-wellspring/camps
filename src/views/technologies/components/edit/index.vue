<template>
  <v-container>
    <locale-select :loading="loading.fetch" @change="handleLocaleChange" />

    <form-wrapper :validator="$v.form">
      <form @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <form-group name="name">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-bind="attrs"
                  :value="form && form.name ? form.name : curItem.name"
                  outlined
                  :label="$t('label.name')"
                  @blur="$v.form.name.$touch()"
                  @input="form.name = $event"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>

          <v-col cols="12" md="6">
            <new-image-upload
              class="file-upload__image"
              :imgUrl="curItem.icon.path"
              @fileSelected="handleImg"
            />
          </v-col>

          <v-col cols="12" md="6">
            <form-group name="url">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-bind="attrs"
                  :value="form && form.url ? form.url : curItem.url"
                  outlined
                  :label="$t('label.url')"
                  @blur="$v.form.url.$touch()"
                  @input="form.url = $event"
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
import { url, minLength, maxLength } from "vuelidate/lib/validators";
import { UpdateData, UpdateMedia, ShowData } from "@/helpers/apiMethods";

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
      icon: null,
      locale: "",
      loading: {
        submit: false,
        fetch: false
      }
    };
  },

  computed: {
    currLocale() {
      return this.locale ? this.locale : this.$store.getters.locale;
    }
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
    handleImg(img) {
      this.icon = img.file;
    },

    submit() {
      if (!this.$v.form.$invalid && Object.entries(this.form).length > 0) {
        this.loading.submit = true;
        let payload = {};
        for (const el in this.form) {
          this.form[el] && (payload[el] = this.form[el]);
          console.log("TCL: submit -> this.form[el]", this.form[el]);
        }
        payload.locale = this.currLocale;
        UpdateData({
          reqName: "technologies",
          data: payload,
          id: this.curItem.id
        })
          .then(() => {
            this.loading.submit = false;
            if (!this.icon) {
              this.reset();
              this.$emit("closed");
            }
          })
          .catch(() => (this.loading.submit = false));
      }

      if (this.icon) {
        this.loading.submit = true;
        let payload = new FormData();
        payload.append("file", this.icon);
        payload.append("_method", "put");
        payload.append("locale", this.currLocale);
        UpdateMedia({ id: this.curItem.icon.id, data: payload })
          .then(() => {
            this.reset();
            this.$emit("closed");
            this.loading.submit = false;
          })
          .catch(() => (this.loading.submit = false));
      }
    },

    handleLocaleChange(locale) {
      this.loading.fetch = true;
      ShowData({ reqName: "technologies", id: this.curItem.id, locale })
        .then(res => {
          this.locale = locale;
          this.form = res.data.technology;
          this.loading.fetch = false;
        })
        .catch(() => (this.loading.fetch = false));
    },

    reset() {
      this.form = {};
      this.icon = null;
      this.locale = this.$store.getters.locale;
    }
  }
};
</script>
