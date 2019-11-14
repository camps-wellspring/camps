<template>
  <main class="works">
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <v-container>
      <v-col cols="12" v-if="$route.params.slug">
        <locale-select @change="fireLocaleChange" />
      </v-col>
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
          <!-- platform component -->
          <Platform :form="form" :myPlatforms="myPlatforms" />
          <!-- platform component -->
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
import { required, minLength, maxLength, numeric, url, requiredIf } from "vuelidate/lib/validators";
import { StoreData, ShowData, UpdateData } from "@/helpers/apiMethods";
import Cookies from "js-cookie";

export default {
  name: "CreateAndEdit",
  components: {
    MainInfo: () => import("./components/MainInfo"),
    Platform: () => import("./components/Platform")
  },
  provide() {
    return {
      hadleChange: this.hadleChange,
      $v: this.$v
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

      myPlatforms: [],

      logoSize: 1.24,
      mainImageSize: 2.48,
      photosMaxSize: 1.24,
      resetImage: false,
      btnLoading: false,

      logoChange: false,
      mainMediaChanged: false,
      multiImageChanged: false,
      videoChanged: false,
      locale: Cookies.get("language")
    };
  },
  mounted() {
    this.showWorkData();
  },
  methods: {
    fireLocaleChange(locale) {
      this.locale = locale;
      this.showWorkData();
    },
    handleSetVideo(videos) {
      this.videoChanged = true;
      this.form.videos = videos;
    },

    showWorkData() {
      const { slug } = this.$route.params;
      if (this.$route.name === "edit_work") {
        ShowData({ reqName: "works", id: slug, locale: this.locale })
          .then(res => {
            const { work } = res.data;
            const { name, description, logo, media, platforms, main_media, priority } = work;
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

            this.mediaPhotos = [];

            media.map(el => {
              if (el.type === "photo") {
                if (!el.main && el.title !== "logo") {
                  this.mediaPhotos.push(el);
                }
              } else {
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

    handleDeletePhoto(index) {
      //   this.form.media.splice(index, 1);
      this.mediaPhotos.splice(index, 1);
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
      const { name, description, main_media, photos, priority, logo, videos } = this.form;

      !this.$route.params.slug && formData.append("main_media", main_media);
      formData.append("name", name);
      description && formData.append("description", description);
      formData.append("priority", priority);
      !this.$route.params.slug && formData.append("logo", logo);

      this.multiImageChanged && photos.map(el => formData.append("photos[]", el));
      this.videoChanged && videos.map(el => formData.append("videos[]", el));
      this.myPlatforms.length &&
        this.myPlatforms.map((el, index) => {
          formData.append(`platforms[${index}][id]`, el.id);
          formData.append(`platforms[${index}][url]`, el.url);
        });
      formData.append("visible", true);
      this.$route.params.slug && formData.append("locale", this.locale);
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
          this.videoChanged = false;
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
    form: {
      handler(form) {
        this.form = form;
      },
      immediate: true
    }
  }
};
</script>
