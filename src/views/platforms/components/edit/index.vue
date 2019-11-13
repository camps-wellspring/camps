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
                  :value="form && form.name ? form.name : currItem.name"
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
              :imgUrl="currItem.icon.path"
              @fileSelected="handleImg"
            />
          </v-col>

          <v-col cols="12" md="6">
            <div class="d-flex align-center">
              <span class="color-label">Color: </span>
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ on }">
                  <v-btn class="color-button" x-large depressed :color="currColor" v-on="on" />
                </template>
                <v-color-picker
                  :value="currColor"
                  @update:color="form.color = $event.hex"
                  mode="hexa"
                  hide-mode-switch
                />
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
        color: null
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
        reqName: "platforms",
        data: payload,
        id: this.currItem.id
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
      ShowData({ reqName: "platforms", id: this.currItem.id, locale })
        .then(res => {
          this.locale = locale;
          this.form = res.data.platform;
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
