<template>
  <v-container>
    <form-wrapper :validator="$v.form">
      <form>
        <v-row>
          <v-col cols="12">
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
          <v-col cols="12" md="6">
            <form-group name="bio">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-model="form.bio"
                  outlined
                  :label="$t('label.bio')"
                  @input="hadleChange('bio')"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12">
            <v-btn class="primary">save</v-btn>
            <v-btn class="warning mx-2" v-on="$listeners">close</v-btn>
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

export default {
  name: "FormComponent",
  data() {
    return {
      resetImage: false,
      form: {
        name: "",
        bio: "",
        position: "",
        priority: "",
        main_image: ""
      },
      maxsize: 2.48
    };
  },

  methods: {
    handleImageSelect(photo) {
      console.log(photo);
    },
    hadleChange(name) {
      this.$v.form[name].$touch();
    },
    reset() {
      this.$v.form.$reset();
      this.form = {};
      this.resetImage = true;
      this.$store.dispatch("ClearServerErrors");
    }
  },
  mounted() {
    window.eventBus.$on("SET_DIALOG", value => {
      if (!value) {
        this.reset();
      }
    });
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
        bio: {
          minLength: minLength(3),
          maxLength: maxLength(50)
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
