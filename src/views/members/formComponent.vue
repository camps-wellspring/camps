<template>
  <v-container>
    <form-wrapper :validator="$v.form">
      <form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" v-if="isEdited">
            <locale-select @change="fireLocaleChange" />
          </v-col>
          <v-col cols="12" md="6">
            <new-image-upload
              class="file-upload__image"
              :imgUrl="form.main_image ? form.main_image.path : ''"
              :resetToggle="resetImage"
              @fileSelected="handleImageSelect"
              :maxSize="maxsize"
            />
          </v-col>
          <v-col cols="12" md="6">
            <form-group name="name">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-model="form.name"
                  outlined
                  :label="$t('label.name')"
                  @input="hadleChange('name')"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12" md="6">
            <form-group name="position">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-model="form.position"
                  outlined
                  :label="$t('label.position')"
                  @input="hadleChange('position')"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12" md="6">
            <form-group name="priority">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-model="form.priority"
                  outlined
                  :label="$t('label.priority')"
                  @input="hadleChange('priority')"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12">
            <form-group name="bio">
              <template slot-scope="{ attrs }">
                <v-textarea
                  auto-grow
                  row-height="20"
                  v-bind="attrs"
                  v-model="form.bio"
                  outlined
                  :label="$t('label.bio')"
                  @input="hadleChange('bio')"
                ></v-textarea>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12">
            <v-btn
              type="submit"
              class="primary"
              :disabled="$v.form.$invalid"
              :loading="btnLoading"
              >{{ $t("button.save") }}</v-btn
            >
            <v-btn class="warning mx-2" v-on="$listeners">{{
              $t("button.close")
            }}</v-btn>
          </v-col>
        </v-row>
      </form>
    </form-wrapper>
  </v-container>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  numeric
} from "vuelidate/lib/validators";
import {
  StoreData,
  UpdateData,
  ShowData,
  UpdateMedia
} from "@/helpers/apiMethods";
import Cookies from "js-cookie";

export default {
  name: "FormComponent",
  props: {
    isEdited: {
      type: Boolean,
      default: false,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      resetImage: false,
      locale: Cookies.get("language"),
      form: {
        name: "",
        bio: "",
        position: "",
        priority: "",
        main_image: ""
      },
      imageFile: "",
      maxsize: 2.48,
      btnLoading: false,
      inputChange: false,
      imageChange: false
    };
  },

  methods: {
    fireLocaleChange(locale) {
      this.locale = locale;
      this.showData(locale);
    },
    showData(locale) {
      ShowData({ reqName: "members", id: this.slug, locale })
        .then(res => {
          const { member } = res.data;
          this.form = member;
          console.log(member);
        })
        .catch(err => {
          console.log(err);
        });
    },
    buildData() {
      const formDate = new FormData();
      Object.keys(this.form).map(key => {
        formDate.append(key, this.form[key]);
      });
      formDate.append("locale", this.locale);
      return formDate;
    },
    createMethod() {
      this.btnLoading = true;
      const formDate = this.buildData();

      StoreData({ reqName: "members", data: formDate })
        .then(res => {
          const { member } = res.data;
          this.$emit("set_memeber", member);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.btnLoading = false;
          this.reset();
        });
    },
    editMethod() {
      const { name, position, bio, priority } = this.form;

      UpdateData({
        reqName: "members",
        data: { name, position, bio, priority, locale: this.locale },
        id: this.slug
        // locale: Cookies.get("language")
      })
        .then(res => {
          const { member } = res.data;
          this.$emit("set_edited_member", member);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.btnLoading = false;
          this.reset();
        });
    },
    handleUpdateImage() {
      const { id } = this.form.main_image;
      const formData = new FormData();
      formData.append("file", this.imageFile);
      formData.append("_method", "put");
      formData.append("locale", this.locale);
      UpdateMedia({ id, data: formData })
        .then(() => {
          this.$emit("set_refresh");
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.reset();
        });
    },
    handleSubmit() {
      this.btnLoading = true;
      if (!this.isEdited) {
        // in case create
        this.createMethod();
      } else if (this.isEdited) {
        // in case Edit
        if (this.inputChange) {
          this.editMethod();
        }
      }

      if (this.imageChange) {
        this.handleUpdateImage();
      }
    },
    handleImageSelect(photo) {
      if (!this.isEdited) {
        this.form.main_image = photo.file;
      } else {
        this.imageFile = photo.file;
      }
      this.imageChange = true;
    },
    hadleChange(name) {
      this.$v.form[name].$touch();
      this.inputChange = true;
    },
    reset() {
      this.$emit("close_dialog");
      this.$v.form.$reset();
      this.form = {};
      this.resetImage = true;
      this.imageChange = false;
      this.inputChange = false;
      this.btnLoading = false;
      this.imageChange = false;
      this.$store.dispatch("ClearServerErrors");
    }
  },
  mounted() {
    window.eventBus.$on("SET_DIALOG", value => {
      if (!value) {
        this.reset();
        this.$emit("toggleEdit");
      }
    });

    // if (this.isEdited) {
    //   this.form = this.editForm;
    // }
  },

  validations() {
    return {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(50)
        },
        position: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(50)
        },
        priority: {
          required,
          numeric
        },
        main_image: {
          required
        },
        bio: {
          minLength: minLength(3),
          maxLength: maxLength(50)
        }
      }
    };
  },
  watch: {
    isEdited: {
      handler(value) {
        if (value) {
          this.showData();
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
