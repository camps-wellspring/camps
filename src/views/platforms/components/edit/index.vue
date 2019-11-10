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
            <new-image-upload
              class="file-upload__image"
              :imgUrl="curItem.icon.path"
              @fileSelected="handleImg"
            />
          </v-col>

          <v-col cols="12" md="6">
            <div class="d-flex align-center">
              <span class="color-label">Color: </span>
              <!-- <v-spacer /> -->
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    x-large
                    depressed
                    :value="item && item.color ? item.color : curItem.color"
                    :color="item && item.color ? item.color : curItem.color"
                    v-on="on"
                  />
                </template>
                <v-color-picker
                  :value="selectColor"
                  @input="form.color = $event"
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
    curItem: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      form: {},
      item: {},
      icon: null,
      locale: "",
      loading: {
        submit: false,
        fetch: false
      }
    };
  },

  computed: {
    selectColor() {
      return this.form && this.form.color
        ? this.form.color
        : this.curItem.color;
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
      if (!this.$v.form.$invalid && Object.entries(this.form).length > 0) {
        console.log(this.form);
        this.loading.submit = true;

        UpdateData({
          reqName: "platforms",
          data: this.form,
          id: this.curItem.id
        })
          .then(() => {
            this.loading.submit = false;
          })
          .catch(() => (this.loading.submit = false));
      }
      if (this.icon) {
        let payload = new FormData();
        payload.append("file", this.icon);
        payload.append("_method", "put");
        payload.append(
          "locale",
          this.locale ? this.locale : this.$store.getters.locale
        );
        UpdateMedia({ id: this.curItem.icon.id, data: payload }).then(res => {
          console.log(res);
        });
      }
    },

    handleLocaleChange(locale) {
      this.loading.fetch = true;
      this.locale = locale;
      ShowData({ reqName: "platforms", id: this.curItem.id, locale }).then(
        res => {
          this.item = res.data.platform;
          this.loading.fetch = false;
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.color-label {
  font-size: 20px;
  padding: 0 1rem;
}
</style>
