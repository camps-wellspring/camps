<template>
  <section>
    <v-card>
      <v-card-title>
        {{ editMode ? $t("title.edit_service") : $t("title.create_service") }}
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <!-- Locale -->
        <v-row v-if="editMode" justify="center">
          <v-col cols="6">
            <locale-select @change="fireLocaleChange" />
          </v-col>
        </v-row>
        <!-- Locale -->

        <!-- Form -->
        <v-form>
          <form-wrapper :validator="$v.service">
            <v-row>
              <v-col md="4" cols="12">
                <form-group name="name">
                  <template slot-scope="{ attrs }">
                    <v-text-field
                      :label="$t('label.name')"
                      v-model="service.name"
                      v-bind="attrs"
                      outlined
                      @blur="$v.service.name.$touch()"
                    >
                    </v-text-field>
                  </template>
                </form-group>
              </v-col>

              <v-col md="4" cols="12">
                <form-group name="priority">
                  <template slot-scope="{ attrs }">
                    <v-text-field
                      :label="$t('label.priority')"
                      v-model="service.priority"
                      v-bind="attrs"
                      type="number"
                      outlined
                      @blur="$v.service.priority.$touch()"
                    >
                    </v-text-field>
                  </template>
                </form-group>
              </v-col>

              <v-col md="4" cols="12">
                <new-image-upload
                  class="file-upload__image"
                  :imgUrl="service.main_image ? service.main_image.path : ''"
                  @fileSelected="handleUploadMainImage"
                />
              </v-col>

              <v-col md="6" cols="12">
                <form-group name="short_description">
                  <template slot-scope="{ attrs }">
                    <v-textarea
                      :label="$t('label.short_description')"
                      v-model="service.short_description"
                      v-bind="attrs"
                      :rows="5"
                      outlined
                      @blur="$v.service.short_description.$touch()"
                    >
                    </v-textarea>
                  </template>
                </form-group>
              </v-col>

              <v-col md="6" cols="12">
                <form-group name="description">
                  <template slot-scope="{ attrs }">
                    <v-textarea
                      :label="$t('label.description')"
                      v-model="service.description"
                      v-bind="attrs"
                      :rows="5"
                      outlined
                      @blur="$v.service.description.$touch()"
                    >
                    </v-textarea>
                  </template>
                </form-group>
              </v-col>

              <v-col md="6" cols="12">
                <multi-image-upload
                  :maxSize="photosMaxSize"
                  :imgsUrl="getPhotos()"
                  @fileSelected="setPhotos"
                  @handle_delete_image="handleDelete"
                />
              </v-col>
            </v-row>
          </form-wrapper>
        </v-form>
        <!-- Form -->
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "handle-service",

  data() {
    return {
      editMode: this.$route.params.slug !== "new",
      service: {
        name: "",
        priority: null,
        short_description: "",
        description: "",
        main_image: {},
        photos: []
      }
    };
  },
  methods: {
    fireLocaleChange(locale) {
      console.log("localeChange", locale);
    },
    handleUploadMainImage(photoFile) {
      this.service.main_image = photoFile.file;
    }
  },
  validations() {
    return {
      service: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(50)
        },
        priority: {
          required
        },
        short_description: {
          required,
          minLength: minLength(3)
        },
        description: {
          required,
          minLength: minLength(3)
        }
      }
    };
  }
};
</script>
