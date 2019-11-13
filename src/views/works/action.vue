<template>
  <main class="works">
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <v-container>
      <form-wrapper :validator="$v.form">
        <form @submit.prevent="handleSubmit">
          <!-- main info componennt -->
          <MainInfo :form="form" />
          <!-- main info componennt -->

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
                    :imgId="form.logo ? form.logo.id : null"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-subheader>Main Image</v-subheader>
                  <new-image-upload
                    class="file-upload__image"
                    :imgUrl="form.main_media ? form.main_media.path : ''"
                    :resetToggle="resetImage"
                    @fileSelected="handleSelectMainImage"
                    :maxSize="mainImageSize"
                    :imgId="form.main_media ? form.main_media.id : null"
                  />
                </v-col>
                <upload-video
                  @set_videos="handleSetVideo"
                  :videosFiles="videosFiles"
                  :updatedVideos="form.videos"
                />

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
                      <template v-slot:item="{ item, index }">
                        <tr>
                          <td>{{ item.name }}</td>
                          <td>{{ item.url }}</td>
                          <td>
                            <v-icon
                              medium
                              title="delete"
                              @click="handleDeletePlatForm(item, index)"
                              >mdi-delete</v-icon
                            >
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
  components: {
    MainInfo: () => import("./components/MainInfo")
  },
  provide() {
    return {
      hadleChange: this.hadleChange
    };
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        priority: "",
        logo: "",

        photos: [],
        platforms_ids: "",
        work_url: "",
        main_media: "",
        videos: []
      },
      updateData: {},
      videosFiles: [],
      mediaPhotos: [],
      items: [],
      myPlatforms: [],
      headers: [],
      logoSize: 1.24,
      mainImageSize: 2.48,
      photosMaxSize: 1.24,
      resetImage: false,
      btnLoading: false,
      selectLoading: true,
      logoChange: false,
      mainMediaChanged: false,
      multiImageChanged: false
    };
  },
  mounted() {
    this.handleGetPlatForms();
    this.createTableHeaders();
    this.showWorkData();
  },
  methods: {
    handleSetVideo(videos) {
      this.form.videos = videos;
    },
    handleDeletePlatForm(item, index) {
      this.$delete(this.myPlatforms, index);
      this.items.unshift(item);
    },

    showWorkData() {
      const { slug } = this.$route.params;
      if (this.$route.name === "edit_work") {
        ShowData({ reqName: "works", id: slug })
          .then(res => {
            const { work } = res.data;
            const {
              name,
              description,
              logo,
              media,
              platforms,
              main_media,
              priority
            } = work;
            this.updateData = work;
            this.form = {
              name,
              description,
              logo,
              main_media,
              priority,
              video: "",
              platforms_ids: "",
              work_url: "",
              videos: []
            };
            this.myPlatforms = platforms;

            media.map(el => {
              if (el.type === "photo") {
                if (!el.main && el.title !== "logo") {
                  if (this.mediaPhotos.includes(el)) {
                    return;
                  }
                  this.mediaPhotos.push(el);
                }
              } else {
                if (this.form.videos.includes(el.path)) {
                  return;
                }
                this.videosFiles.push(el);
                this.form.videos.push(el);
              }
            });
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
      if (this.myPlatforms.includes(platFormObject)) {
        this.items = this.items.filter(el => el.id !== platFormObject.id);
      }
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
      if (this.mediaPhotos) {
        return this.mediaPhotos;
      }
    },
    setPhotos(photo) {
      this.form.photos = photo;
      this.multiImageChanged = true;
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
      this.form.main_media = photo.file;
      this.mainMediaChanged = true;
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
        main_media,
        photos,
        priority,
        logo,
        videos
      } = this.form;

      !this.$route.params.slug && formData.append("main_media", main_media);
      formData.append("name", name);
      description && formData.append("description", description);
      formData.append("priority", priority);
      !this.$route.params.slug && formData.append("logo", logo);

      this.multiImageChanged &&
        photos.map(el => formData.append("photos[]", el));
      videos.length && videos.map(el => formData.append("videos[]", el));
      this.myPlatforms.length &&
        this.myPlatforms.map((el, index) => {
          formData.append(`platforms[${index}][id]`, el.id);
          formData.append(`platforms[${index}][url]`, el.url);
        });
      formData.append("visible", true);
      formData.append("locale", "en");
      this.$route.name === "edit_work" && formData.append("_method", "put");
      return formData;
    },
    createWork() {
      const formData = this.buildData();
      StoreData({ reqName: "works", data: formData })
        .then(() => {
          this.$router.go(-1);
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.btnLoading = false;
        });
    },
    updateWork() {
      const formData = this.buildData();
      UpdateData({
        reqName: "works",
        data: formData,
        id: this.$route.params.slug
      })
        .then(() => {
          this.$router.go(-1);
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
    }
  },
  watch: {
    myPlatforms: {
      handler(myPlatforms) {
        if (myPlatforms && this.items) {
          const platformsIds = [];
          myPlatforms.forEach(el => platformsIds.push(el.id));
          this.items = this.items.filter(el => !platformsIds.includes(el.id));
        }
        // console.log(myPlatforms);
      },
      immediate: true
    },
    form: {
      handler(form) {
        this.form = form;
      },
      immediate: true
    }
  }
};
</script>
