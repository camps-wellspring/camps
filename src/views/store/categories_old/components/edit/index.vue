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
                  v-model="form.name"
                  outlined
                  :label="$t('label.name')"
                  @blue="$v.form.name.$touch()"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>

          <v-col cols="12" md="6">
            <new-image-upload
              class="file-upload__image"
              :imgUrl="currItem.icon.path"
              @fileSelected="handleImg"
            />
          </v-col>

          <v-col cols="12" md="6">
            <div class="d-flex align-center">
              <span class="color-label">{{ $t("label.color") }}:</span>
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ on }">
                  <v-btn class="color-button" x-large depressed :color="currColor" v-on="on" />
                </template>
                <v-color-picker v-model="form.color" mode="hexa" hide-mode-switch />
              </v-menu>
            </div>
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
import { minLength, maxLength } from "vuelidate/lib/validators";
import { UpdateData, UpdateMedia, ShowData } from "@/helpers/apiMethods";

export default {
  props: {
    currItem: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      form: {
        color: null,
        name: ""
      },
      icon: null,
      locale: "",
      loading: {
        submit: false,
        fetch: false
      }
    };
  },

  computed: {
    currColor() {
      return this.form.color ? this.form.color : this.currItem.color;
    },
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
        }
      }
    };
  },

  watch: {
    currItem: {
      handler(value) {
        this.form = { ...value };
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    handleImg(img) {
      this.icon = img.file;
    },

    submit() {
      this.loading.submit = true;
      let payload = {};
      for (const el in this.form) {
        this.form[el] && (payload[el] = this.form[el]);
      }
      payload.locale = this.currLocale;
      payload._method = "put";

      UpdateData({
        reqName: "store-categories",
        data: payload,
        id: this.currItem.slug
      })
        .then(() => {
          this.loading.submit = false;
          if (!this.icon) {
            this.reset();
            this.$emit("closed");
          }
        })
        .catch(() => (this.loading.submit = false));

      if (this.icon) {
        this.loading.submit = true;
        let payload = new FormData();
        payload.append("file", this.icon);
        payload.append("_method", "put");
        payload.append("locale", this.currLocale);
        UpdateMedia({ id: this.currItem.icon.id, data: payload })
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
      ShowData({ reqName: "store-categories", id: this.currItem.slug, locale })
        .then(res => {
          this.locale = locale;
          this.form = res.data.store_category;
          this.loading.fetch = false;
        })
        .catch(() => (this.loading.fetch = false));
    },

    reset() {
      this.form = {
        color: null
      };
      this.icon = null;
      this.locale = this.$store.getters.locale;
    }
  }
};
</script>
