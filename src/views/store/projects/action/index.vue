<template>
  <div class="form-page">
    <v-container>
      <locale-select
        v-if="actionType === 'edit'"
        :loading="loading.fetch"
        @change="handleLocaleChange"
      />

      <form-wrapper :validator="$v.form">
        <v-form @submit.prevent="onSubmit">
          <!-- MAIN INFO -->
          <v-card>
            <v-card-title>{{ $t("heading.main_info") }}</v-card-title>
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="6">
                    <form-group name="name">
                      <template slot-scope="{ attrs }">
                        <v-text-field
                          v-model="form.name"
                          v-bind="attrs"
                          outlined
                          :label="$t('label.name')"
                          @blur="$v.form.name.$touch()"
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>

                  <v-col cols="12" md="6">
                    <form-group name="main_media">
                      <template slot-scope="{ attrs }">
                        <new-image-upload
                          class="file-upload__image"
                          :imgUrl="form.main_media && form.main_media.path"
                          :imgId="form.main_media && form.main_media.id"
                          @fileSelected="handleImgSelect"
                          v-bind="attrs"
                          :max-size="2"
                        />
                      </template>
                    </form-group>
                  </v-col>

                  <v-col cols="12">
                    <form-group name="description">
                      <template slot-scope="{ attrs }">
                        <v-textarea
                          v-model.trim="form.description"
                          v-bind="attrs"
                          outlined
                          no-resize
                          auto-grow
                          :label="$t('label.description')"
                          @blur="$v.form.description.$touch()"
                        ></v-textarea>
                      </template>
                    </form-group>
                  </v-col>

                  <v-col cols="12">
                    <form-group name="short_description">
                      <template slot-scope="{ attrs }">
                        <v-textarea
                          v-model.trim="form.short_description"
                          v-bind="attrs"
                          outlined
                          no-resize
                          rows="3"
                          :label="$t('label.short_description')"
                          @blur="$v.form.short_description.$touch()"
                        ></v-textarea>
                      </template>
                    </form-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>

          <!-- MEDIA -->
          <media
            :photos="mediaPhotos"
            @ImgSelected="form.photos = $event"
            @ImgDeleted="form.photos.splice($event, 1)"
          />

          <!-- DEMOS -->
          <demos
            :demo-types="options['demo-types']"
            :added-demos="form.demos"
            @AddDemo="pushToTable"
            @DeleteDemo="removeFromTable"
          />

          <!-- PLATFORMS -->
          <platforms
            :platforms="options.platforms"
            :added-platforms="form.platforms"
            @AddPlatform="pushToTable"
            @DeletePlatform="removeFromTable"
          />

          <!-- CATEGORIES & TECHNOLOGIES -->
          <options
            :options="additionalOptions"
            :selected-items="selectedOptions"
            @categoriesUpdated="form.categories = $event"
            @technologiesUpdated="form.technologies = $event"
          />

          <div class="d-flex justify-center">
            <v-btn
              x-large
              type="submit"
              class="primary my-5"
              :disabled="$v.form.$invalid"
              :loading="loading.submit"
              >{{ $t("button.submit") }}</v-btn
            >
          </div>
        </v-form>
      </form-wrapper>
    </v-container>

    <global-image-preview
      :image-path="currImg"
      :show-dialog="imgPreviewDialog"
      @closePreview="closePreview"
    />
  </div>
</template>

<script>
import { minLength, maxLength, required, requiredIf } from "vuelidate/lib/validators";
import { minWords, maxWords } from "@/utils/validate";
import { IndexData, StoreData, ShowData, UpdateData } from "@/helpers/apiMethods";
import { deepFormData } from "@/helpers/deepFormData";
import imgPreviewMixin from "@/mixins/imgPreview";

export default {
  name: "CreateProject",

  components: {
    Demos: () => import("./components/demos"),
    Media: () => import("./components/media"),
    Platforms: () => import("./components/platforms"),
    Options: () => import("./components/options")
  },

  mixins: [imgPreviewMixin],

  data() {
    return {
      form: {
        name: "",
        description: "",
        short_description: "",
        main_media: null,
        photos: [],
        demos: [],
        platforms: [],
        categories: [],
        technologies: []
      },

      mediaPhotos: [],

      options: {
        ["demo-types"]: [],
        ["store-categories"]: [],
        technologies: [],
        platforms: []
      },

      loading: {
        submit: false,
        fetch: false
      },

      locale: this.$store.getters.locale
    };
  },

  computed: {
    actionType() {
      return this.$route.params.actionType === "edit" ? "edit" : "create";
    },

    slug() {
      return this.$route.params && this.$route.params.slug;
    },

    additionalOptions() {
      return {
        categories: this.options["store-categories"],
        technologies: this.options.technologies
      };
    },

    selectedOptions() {
      return {
        categories: this.form.categories,
        technologies: this.form.technologies
      };
    }
  },

  validations() {
    return {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(50)
        },
        main_media: {
          required: requiredIf(() => this.actionType === "create")
        },
        // TODO dynamically display min & max values in the message validation error message
        description: {
          minWords: minWords(3),
          maxWords: maxWords(500)
        },
        short_description: {
          minLength: minLength(10),
          maxLength: maxLength(150)
        }
      }
    };
  },

  created() {
    this.fetchOptions();
    this.actionType === "edit" && this.fetchProject();
    console.log("TCL: created -> this.actionType", this.actionType);
  },

  methods: {
    fetchOptions() {
      Object.keys(this.options).forEach(el => {
        IndexData({ reqName: el }).then(res => {
          if (el === "demo-types" || el === "platforms") {
            this.options[el] = res.data.data.map(item => {
              return { name: item.name, id: item.id };
            });
          } else {
            this.options[el] = res.data.data;
          }
        });
      });
    },

    fetchProject() {
      this.loading.fetch = true;
      ShowData({ reqName: "projects", id: this.slug, locale: this.locale })
        .then(res => {
          this.form = res.data.project;
          // extracting additional media files
          this.form.media.length > 0 && (this.mediaPhotos = this.form.media);
          this.loading.fetch = false;
        })
        .catch(() => {
          this.loading.fetch = false;
        });
    },

    onSubmit() {
      this.actionType === "create" ? this.createProject() : this.updateProject();
      this.createProject();
    },

    createProject() {
      const data = deepFormData(this.form);
      this.loading.submit = true;
      StoreData({ reqName: "projects", data })
        .then(() => {
          this.loading.submit = false;
          this.$router.push({ name: "Projects" });
        })
        .catch(() => (this.loading.submit = false));
    },

    updateProject() {
      console.log("is update");
      this.loading.submit = true;
      UpdateData({ reqName: "projects", data: this.form, id: this.slug, locale: this.locale })
        .then(() => {
          this.loading.submit = false;
          this.$router.push({ name: "Projects" });
        })
        .catch(() => {
          this.loading.submit = false;
        });
    },

    handleLocaleChange(locale) {
      this.locale = locale;
      this.fetchProject();
    },

    handleImgSelect(img) {
      this.form.main_media = img.file;
      this.$v.form.main_media.$touch();
    },

    pushToTable(newItem, field, name) {
      this.form[field].push(newItem);
      const index = this.options[name].findIndex(el => el.id === newItem.id);
      this.options[name].splice(index, 1);
    },

    removeFromTable(item, i, field, name) {
      this.form[field].splice(i, 1);
      this.options[name].push(item);
    }
  }
};
</script>
