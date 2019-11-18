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
                <v-row>
                  <v-col cols="12" md="6">
                    <form-group name="id">
                      <template slot-scope="{ attrs }">
                        <v-select
                          v-bind="attrs"
                          outlined
                          :label="$t('label.demo_type')"
                          :items="options['demo-types']"
                          item-text="name"
                          return-object
                          @input="handleDemoChoose"
                          @change="$v.demo.id.$touch()"
                          ref="demoSelect"
                        />
                      </template>
                    </form-group>
                  </v-col>

                  <v-col cols="12" md="6">
                    <form-group name="url">
                      <template slot-scope="{ attrs }">
                        <v-text-field
                          v-model="demo.url"
                          v-bind="attrs"
                          outlined
                          :label="$t('label.demo_url')"
                          @blur="$v.demo.url.$touch()"
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>

                  <v-col cols="12" md="6">
                    <new-image-upload
                      class="file-upload__image"
                      :imgUrl="demo.screen && demo.screen.path"
                      :imgId="demo.screen && demo.screen.id"
                      :max-size="2"
                      @fileSelected="demo.screen = $event"
                    />
                  </v-col>

                  <v-col sm="3" class="d-flex justify-center">
                    <v-switch hide-details v-model="demo.visible" :label="$t('label.visible')" />
                  </v-col>

                  <v-col sm="3">
                    <v-card-actions>
                      <v-btn
                        block
                        :disabled="$v.demo.$invalid"
                        @click="addDemo"
                        class="primary"
                        large
                        >{{ $t("button.add") }}</v-btn
                      >
                    </v-card-actions>
                  </v-col>
                </v-row>

                <v-card-text v-if="form.demos.length > 0">
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12">
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th>{{ $t("table.name") }}</th>
                                <th>{{ $t("table.url") }}</th>
                                <th>{{ $t("table.visible") }}</th>
                                <th>{{ $t("table.screen") }}</th>
                                <th>{{ $t("table.delete") }}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item, i) in form.demos" :key="item.id">
                                <td>
                                  <read-more
                                    class="read-more"
                                    :text="item.name"
                                    :max-chars="20"
                                    less-str="read less"
                                  />
                                </td>
                                <td>
                                  <read-more
                                    class="read-more"
                                    :text="item.url"
                                    :max-chars="50"
                                    less-str="read less"
                                  />
                                </td>
                                <td>
                                  <v-avatar>
                                    <img
                                      @click="handleImgPreview(screenPath(item.screen.file))"
                                      :src="screenPath(item.screen.file)"
                                    />
                                  </v-avatar>
                                </td>
                                <td>
                                  <v-switch hide-details v-model="item.visible" />
                                </td>
                                <td>
                                  <v-btn icon>
                                    <v-icon medium title="delete" @click="handleItemDelete(item, i)"
                                      >mdi-delete</v-icon
                                    >
                                  </v-btn>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
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

    <global-image-preview
      :image-path="currImg"
      :show-dialog="imgPreviewDialog"
      @closePreview="closePreview"
    />
  </div>
</template>

<script>
import { minLength, maxLength, required, requiredIf, url } from "vuelidate/lib/validators";
import { minWords, maxWords } from "@/utils/validate";
import switchLocale from "@/mixins/switchLocale";
import imgPreviewMixin from "@/mixins/imgPreview";
import { IndexData } from "@/helpers/apiMethods";

export default {
  name: "CreateProject",

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
      demoTypes: [],
      demo: {
        id: null,
        url: "",
        visible: true,
        screen: null
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
      demo: {
        id: {
          required
        },
        url: {
          required,
          url
        },
        screen: {
          required
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

    handleDemoChoose(demoItem) {
      Object.assign(this.demo, demoItem);
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
      this.demo.screen = img;
    },

    screenPath(file) {
      return URL.createObjectURL(file);
    },

    addDemo() {
      this.form.demos.push(this.demo);
      const demoTypeIndex = this.options["demo-types"].indexOf({
        id: this.demo.id,
        name: this.demo.name
      });
      this.options["demo-types"].splice(demoTypeIndex, 1);
      this.demo = {
        id: null,
        url: "",
        visible: true,
        screen: null
      };
    },

    handleItemDelete(item, i) {
      this.form.demos.splice(i, 1);
      this.options["demo-types"].push(item);
      this.$refs.demoSelect.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
th,
td {
  text-align: center !important;
}

.v-avatar {
  border-radius: 0;
  cursor: pointer;
  img {
    padding: 0.5rem;
  }
}
</style>
