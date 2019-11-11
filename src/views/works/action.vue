<template>
  <main class="works">
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <v-container>
      <form-wrapper :validator="$v.form">
        <form @submit.prevent="handleSubmit">
          <v-card class="pa-0" flat>
            <v-card-title>main Info</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
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
                <v-col cols="12">
                  <form-group name="description">
                    <template slot-scope="{ attrs }">
                      <v-textarea
                        v-bind="attrs"
                        v-model="form.description"
                        outlined
                        auto-grow
                        row-height="40"
                        :label="$t('label.description')"
                        @input="hadleChange('description')"
                      ></v-textarea>
                    </template>
                  </form-group>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title>Media</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-subheader>logo</v-subheader>
                  <new-image-upload
                    class="file-upload__image"
                    :imgUrl="form.logo ? form.logo.path : ''"
                    :resetToggle="resetImage"
                    @fileSelected="handleselectLogo"
                    :maxSize="logoSize"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-subheader>Main Image</v-subheader>
                  <new-image-upload
                    class="file-upload__image"
                    :imgUrl="form.logo ? form.logo.path : ''"
                    :resetToggle="resetImage"
                    @fileSelected="handleSelectMainImage"
                    :maxSize="mainImageSize"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <form-group name="video">
                    <template slot-scope="{ attrs }">
                      <div class="input_wrpper">
                        <v-row>
                          <v-col md="10">
                            <v-text-field
                              :label="$t('label.video_url')"
                              outlined
                              v-model="form.video"
                              v-bind="attrs"
                              @input="hadleChange('video')"
                            ></v-text-field>
                          </v-col>
                          <v-col md="2">
                            <v-btn
                              @click="addVedios"
                              v-show="form.video !== ''"
                              large
                              color="primary"
                              :disabled="$v.form.video.$invalid"
                              >{{ $t("button.add") }}
                            </v-btn>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col
                            cols="12"
                            md="6"
                            v-for="(video, index) in videos"
                            :key="index"
                            class="video_pointer mb-2"
                          >
                            <div v-if="videos.length > 0">
                              <iframe
                                class="ml-2"
                                width="100%"
                                height="200"
                                :src="convertVideo(video)"
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                              ></iframe>
                              <v-icon
                                @click="deleteVideo(index)"
                                class="close_icon"
                                medium
                                color="#fff"
                                >mdi-close
                              </v-icon>
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                    </template>
                  </form-group>
                </v-col>

                <v-col cols="12" md="6" class="mt-3">
                  <multi-image-upload
                    :maxSize="photosMaxSize"
                    :imgsUrl="getPhotos()"
                    @fileSelected="setPhotos"
                    @handle_delete_image="handleDeletePhoto"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title>Platforms</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col md="4">
                      <form-group name="platforms_ids">
                        <template slot-scope="{ attrs }">
                          <v-select
                            v-bind="attrs"
                            :items="items"
                            item-text="name"
                            item-value="id"
                            outlined
                            v-model="form.platforms_ids"
                            :loading="selectLoading"
                            :label="$t('label.platforms')"
                            @input="hadleChange('platforms_ids')"
                          ></v-select>
                        </template>
                      </form-group>
                    </v-col>
                    <v-col md="6">
                      <form-group name="work_url" attribute="label.url">
                        <template slot-scope="{ attrs }">
                          <v-text-field
                            v-bind="attrs"
                            v-model="form.work_url"
                            outlined
                            :label="$t('label.url')"
                            @input="hadleChange('work_url')"
                          ></v-text-field>
                        </template>
                      </form-group>
                    </v-col>
                    <v-col md="2">
                      <v-btn
                        @click="handleAddPlatforms"
                        :disabled="handleValidPlatforms()"
                        class="primary"
                        large
                        >{{ $t("button.add") }}</v-btn
                      >
                    </v-col>
                  </v-row>
                  <!-- table -->
                  <transition name="fadeIn" mode="in-out">
                    <v-data-table
                      v-if="myPlatforms.length > 0"
                      :headers="headers"
                      :items="myPlatforms"
                      hide-default-footer
                      :items-per-page="20"
                    >
                      <template v-slot:item="{ item }">
                        <tr>
                          <td>{{ item.name }}</td>
                          <td>{{ item.url }}</td>
                          <td>
                            <v-icon medium title="delete">mdi-delete</v-icon>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </transition>

                  <!-- table -->
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-col cols="12">
            <v-btn
              type="submit"
              class="primary"
              :disabled="$v.form.$invalid"
              :loading="btnLoading"
              >{{ $t("button.save") }}</v-btn
            >
          </v-col>
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
  numeric,
  url,
  requiredIf
} from "vuelidate/lib/validators";
import TableHeaders from "@/helpers/TableHeaders";
import {
  IndexData,
  StoreData,
  ShowData,
  UpdateData
} from "../../helpers/apiMethods";

export default {
  name: "CreateAndEdit",
  data() {
    return {
      form: {
        name: "",
        description: "",
        priority: "",
        logo: "",
        video: "",
        media: [],
        platforms_ids: "",
        work_url: ""
      },
      videos: [],
      media: [],
      items: [],
      myPlatforms: [],
      headers: [],
      logoSize: 1.24,
      mainImageSize: 2,
      photosMaxSize: 1.24,
      resetImage: false,
      btnLoading: false,
      selectLoading: true,
      logoChange: false
    };
  },
  mounted() {
    this.handleGetPlatForms();
    this.createTableHeaders();
    this.showWorkData();
  },
  methods: {
    deleteVideo(index) {
      this.videos.splice(index, 1);
    },
    addVedios() {
      //   this.updatedData.vedios.push(this.form.vedio);
      if (this.form.vedio !== "") {
        if (this.videos.includes(this.form.video)) {
          return;
        }
        this.videos.push(this.form.video);
        this.form.video = "";
        this.$v.form.$reset();
      }
    },
    convertVideo(video) {
      let url;
      let key;
      var regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
      key = video.match(regex)[1];
      url = video.substring(0, 24) + "embed/" + key;
      return url;
    },
    showWorkData() {
      const { slug } = this.$route.params;
      if (this.$route.name === "edit_work") {
        ShowData({ reqName: "works", id: slug })
          .then(res => {
            const { work } = res.data;
            const {
              name,
              priority,
              description,
              main_video,
              logo,
              media,
              platforms
            } = work;
            this.form = {
              name,
              priority,
              description,
              logo,
              media: [],
              main_video: main_video.path,
              platforms_ids: "",
              work_url: ""
            };

            this.media = media;
            this.myPlatforms = platforms;
            console.log(work, "show");
          })
          .catch(err => console.log(err));
      }
    },
    resetData() {
      this.$v.form.$reset();
      this.form = {};
    },
    handleValidPlatforms() {
      return (
        this.$v.form.platforms_ids.$invalid || this.$v.form.work_url.$invalid
      );
    },
    handleAddPlatforms() {
      const { work_url, platforms_ids } = this.form;
      const platFormObject = this.items.filter(
        el => el.id === platforms_ids
      )[0];
      platFormObject.url = work_url;

      if (work_url !== "" && platforms_ids !== "") {
        this.myPlatforms.push(platFormObject);
      }
      this.form.work_url = "";
      this.form.platforms_ids = "";
      this.$v.form.$reset();
    },
    createTableHeaders() {
      const headersList = ["name", "url", "configs"];
      this.headers = TableHeaders(headersList);
    },
    handleGetPlatForms() {
      IndexData({ reqName: "platforms" })
        .then(res => {
          const { data } = res.data;

          this.items = data.map(el => {
            return {
              id: el.id,
              name: el.name
            };
          });
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.selectLoading = false;
        });
    },
    handleDeletePhoto(index) {
      this.form.media.splice(index, 1);
    },
    getPhotos() {
      if (this.media) {
        return this.media;
      }
    },
    setPhotos(photo) {
      console.log(photo);
      this.form.media = photo;
    },
    handleSubmit() {
      this.btnLoading = true;
      if (this.$route.name === "create_work") {
        // in case create
        this.createWork();
      } else {
        // in case update
        this.updateWork();
      }
    },
    hadleChange(name) {
      this.$v.form[name].$touch();
    },
    handleSelectMainImage(photo) {
      this.form.main_image = photo.file;
    },
    handleselectLogo(photo) {
      this.form.logo = photo.file;
      this.logoChange = true;
    },
    buildData() {
      const formData = new FormData();
      const {
        name,
        description,
        main_video,
        media,
        priority,
        logo
      } = this.form;
      formData.append("name", name);
      description && formData.append("description", description);
      formData.append("main_video", main_video);
      formData.append("priority", priority);
      this.logoChange && formData.append("logo", logo);
      media.length && media.map(el => formData.append("media[]", el));
      this.myPlatforms.length &&
        this.myPlatforms.map(el => {
          formData.append("platforms.id", el.id);
          formData.append("platforms.url", el.url);
        });
      formData.append("visible", true);
      formData.append("locale", "en");
      this.$route.name === "edit_work" && formData.append("_method", "put");
      return formData;
    },
    createWork() {
      const formData = this.buildData();
      StoreData({ reqName: "works", data: formData })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.btnLoading = false;
          this.$router.go(-1);
        });
    },
    updateWork() {
      const formData = this.buildData();
      UpdateData({
        reqName: "works",
        data: formData,
        id: this.$route.params.slug
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.btnLoading = false;
        });
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
        },
        video: {
          required,
          url
        },
        platforms_ids: {
          required: requiredIf(el => {
            return el.work_url !== "";
          })
        },
        work_url: {
          url,
          required: requiredIf(el => {
            return el.platforms_ids !== "";
          })
        }
      }
    };
  },
  computed: {
    formTitle() {
      if (this.$route.name === "create_work") {
        return this.$t("heading.create");
      } else {
        return this.$t("heading.edit");
      }
    },
    getVideoUrl: {
      get() {
        if (this.$route.name === "create_work") {
          return this.form.main_video;
        } else {
          return this.form.main_video ? this.form.main_video.path : "";
        }
      },
      set(value) {
        if (value) {
          this.form.main_video = value;
        }
        console.log(value);
      }
    }
  },
  watch: {
    $route: {
      handler(route) {},
      immediate: true
    },
    myPlatforms: {
      handler(myPlatforms) {
        console.log(myPlatforms);
      },
      immediate: true
    }
  }
};
</script>
