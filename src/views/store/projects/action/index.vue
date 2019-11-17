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

          <v-card>
            <v-card-title>{{ $t("heading.media") }}</v-card-title>
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <form-group name="main_media">
                      <template slot-scope="{ attrs }">
                        <multi-image-upload
                          v-bind="attrs"
                          :maxSize="2"
                          :imgsUrl="getPhotos()"
                          @fileSelected="setPhotos"
                          @handle_delete_image="deletePhoto"
                        />
                      </template>
                    </form-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>

          <!-- DEMOS -->

          <v-card>
            <v-card-title>{{ $t("heading.demo") }}</v-card-title>
            <v-card-text>
              <v-container fluid>
                <v-row v-for="(demo, i) in form.demo_types" :key="i">
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="demo.id"
                      v-bind="attrs"
                      outlined
                      :label="$t('label.demo_type')"
                      :items="options['demo-types']"
                      item-text="name"
                      item-value="id"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <form-group name="demo_url">
                      <template slot-scope="{ attrs }">
                        <v-text-field
                          v-model="demo.url"
                          v-bind="attrs"
                          outlined
                          :label="$t('label.demo_url')"
                          @blur="$v.demo_url.$touch()"
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>

                  <v-col cols="12" md="6">
                    <new-image-upload
                      class="file-upload__image"
                      :imgUrl="demo.screen && demo.screen.path"
                      :imgId="demo.screen && demo.screen.path"
                      :max-size="2"
                      @fileSelected="handleDemoImg($event)"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>

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
  </div>
</template>

<script>
import { minLength, maxLength, required, requiredIf, url } from "vuelidate/lib/validators";
import { minWords, maxWords } from "@/utils/validate";
import switchLocale from "@/mixins/switchLocale";
import { IndexData } from "@/helpers/apiMethods";

export default {
  name: "CreateProject",

  mixins: [switchLocale],

  data() {
    return {
      form: {
        name: "",
        description: "",
        short_description: "",
        main_media: null,
        photos: [],
        demo_types: [
          {
            id: null,
            url: "",
            visible: true,
            screen: null
          }
        ]
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
      },
      demo_url: {
        url
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
          this.options[el] = res.data.data;
          this.loading.options[el] = false;
        });
      });
    },

    handleImg(img) {
      this.form.main_media = img.file;
      this.$v.form.main_media.$touch();
    },

    setPhotos(photos) {
      this.form.photos = photos;
    },

    deletePhoto(i) {
      this.form.photos.splice(i, 1);
    },

    getPhotos() {
      if (this.mediaPhotos) {
        return this.mediaPhotos;
      }
    },

    handleDemoImg(img) {
      console.log("TCL: handleDemoImg -> img", img);
    }
  }
};
</script>
