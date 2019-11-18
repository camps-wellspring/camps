<template>
  <div class="form-page">
    <v-container>
      <locale-select
        v-if="actionType === 'update'"
        :loading="loading.fetch"
        @change="handleLocaleChange"
      />

      <form-wrapper :validator="$v.form">
        <form @submit.prevent="onSubmit">
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
                          @fileSelected="handleImg"
                          v-bind="attrs"
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
            @AddDemo="addDemo"
            @DeleteDemo="deleteDemo"
          />

          <v-col cols="12">
            <v-btn
              type="submit"
              class="primary"
              :disabled="$v.form.$invalid"
              :loading="loading.submit"
              >{{ $t("button.submit") }}</v-btn
            >
          </v-col>
        </form>
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
import switchLocale from "@/mixins/switchLocale";
import imgPreviewMixin from "@/mixins/imgPreview";
import { IndexData } from "@/helpers/apiMethods";

export default {
  name: "CreateProject",

  components: {
    Demos: () => import("./components/demos"),
    Media: () => import("./components/media")
  },

  mixins: [switchLocale, imgPreviewMixin],

  data() {
    return {
      form: {
        name: "",
        description: "",
        short_description: "",
        main_media: null,
        photos: [],
        demos: []
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
        fetch: false,
        options: {
          ["demo-types"]: false,
          ["store-categories"]: false,
          technologies: false,
          platforms: false
        }
      }
    };
  },

  computed: {
    actionType() {
      const pathArr = this.$route.path.split("/");
      const actionType = pathArr[pathArr.length - 1];
      return actionType === "create" ? "create" : "update";
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
        // TODO dynamically display min & max values in the message
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
  },

  methods: {
    fetchOptions() {
      Object.keys(this.options).forEach(el => {
        this.loading.options[el] = true;
        IndexData({ reqName: el }).then(res => {
          if (el === "demo-types") {
            res.data.data.map(item => {
              return (this.options[el] = [{ name: item.name, id: item.id }]);
            });
          } else {
            this.options[el] = res.data.data;
          }
          this.loading.options[el] = false;
        });
      });
    },

    handleImg(img) {
      this.form.main_media = img.file;
      this.$v.form.main_media.$touch();
    },

    // setPhotos(photos) {
    //   this.form.photos = photos;
    // },

    // deletePhoto(i) {
    //   this.form.photos.splice(i, 1);
    // },

    // getPhotos() {
    //   if (this.mediaPhotos) {
    //     return this.mediaPhotos;
    //   }
    // },

    addDemo(newDemo) {
      this.form.demos.push(newDemo);
      const demoTypeIndex = this.options["demo-types"].indexOf({
        id: newDemo.id,
        name: newDemo.name
      });
      this.options["demo-types"].splice(demoTypeIndex, 1);
    },

    deleteDemo(item, i) {
      this.form.demos.splice(i, 1);
      this.options["demo-types"].push(item);
    }
  }
};
</script>
