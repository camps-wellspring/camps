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
                  @handle_delete_image="handleDeletePhoto"
                />
              </v-col>
            </v-row>
          </form-wrapper>
        </v-form>
        <!-- Form -->
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="mt-2 mb-1"
          color="primary"
          :disabled="$v.$invalid"
          :loading="loading.save"
          @click="save"
        >
          {{ $t("button.save") }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { ShowData, StoreData, UpdateData } from "@/helpers/apiMethods";
import Cookies from "js-cookie";

export default {
  name: "handle-service",

  mounted() {
    if (this.$route.params.slug !== "new") {
      this.editMode = true;
      this.getServiceData();
    }
  },
  data() {
    return {
      editMode: false,
      service: {
        name: "",
        priority: null,
        short_description: "",
        description: "",
        main_image: {}
      },
      locale: Cookies.get("language"),
      loading: {
        save: false
      },

      photos: [],
      media: [],
      photosMaxSize: 1.024
    };
  },
  methods: {
    getServiceData() {
      ShowData({
        reqName: "services",
        id: this.$route.params.slug,
        locale: this.locale
      })
        .then(res => {
          const { service } = res.data;
          Object.keys(this.service).forEach(key => {
            this.service[key] = service[key];
          });

          this.media = [...service.media];
        })
        .catch(err => {
          console.log(err);
        });
    },
    fireLocaleChange(locale) {
      this.locale = locale;
      this.getServiceData();
    },
    handleUploadMainImage(photoFile) {
      this.service.main_image = photoFile.file;
    },
    setPhotos(photos) {
      this.photos = photos;
    },
    getPhotos() {
      if (this.media) {
        return this.media;
      }
    },
    handleDeletePhoto(index) {
      this.media.splice(index, 1);
    },
    save() {
      this.loading.save = true;

      // handle requests
      if (!this.editMode) {
        this.StoreService();
      } else {
        this.UpdateService();
      }
    },
    StoreService() {
      // set the request data
      let formData = new FormData();
      Object.keys(this.service).forEach(key => {
        formData.append(key, this.service[key]);
      });

      // handle photos
      if (this.photos.length) {
        this.photos.forEach((photo, index) => {
          formData.append(`photos[${index}]`, photo);
        });
      }

      // Create serveice
      StoreData({
        reqName: "services",
        data: formData
      })
        .then(() => {
          this.popUp(
            this.$t("message.services_should_have_subs"),
            "info",
            true
          ).then(value => {
            if (!value.dismiss) {
              this.$router.push({ name: "ServicesList" });
              this.loading.save = false;
            }
          });
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },
    UpdateService() {
      // Edit serveice
      let reqData = { ...this.service };
      delete reqData.main_image;

      UpdateData({
        reqName: "services",
        id: this.$route.params.slug,
        data: { ...reqData, locale: this.locale, _method: "PUT" }
      })
        .then(() => {
          this.$router.push({ name: "ServicesList" });
          this.loading.save = false;
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
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
