<template>
  <main>
    <v-container>
      <form-wrapper :validator="$v.form">
        <form @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <new-image-upload
                class="file-upload__image"
                :imgUrl="form.logo ? form.logo.path : ''"
                :resetToggle="resetImage"
                @fileSelected="handleImageSelect"
                :maxSize="maxSize"
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
              <form-group name="description">
                <template slot-scope="{ attrs }">
                  <v-textarea
                    v-bind="attrs"
                    v-model="form.description"
                    outlined
                    auto-grow
                    row-height="20"
                    :label="$t('label.description')"
                    @input="hadleChange('description')"
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
            </v-col>
          </v-row>
        </form>
      </form-wrapper>
    </v-container>
  </main>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  numeric
} from "vuelidate/lib/validators";
export default {
  name: "CreateAndEdit",
  data() {
    return {
      form: {
        name: "",
        description: "",
        priority: "",
        logo: ""
      },
      maxSize: 1.24,
      resetImage: false,
      btnLoading: false
    };
  },
  methods: {
    handleSubmit() {
      this.btnLoading = true;
    },
    hadleChange(name) {
      this.$v.form[name].$touch();
    },
    handleImageSelect(photo) {
      this.form.logo = photo.file;
    }
  },
  validations() {
    return {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(150)
        },
        description: {
          minLength: minLength(3),
          maxLength: maxLength(500)
        },
        priority: {
          required,
          numeric
        },
        logo: {
          required
        }
      }
    };
  }
};
</script>
