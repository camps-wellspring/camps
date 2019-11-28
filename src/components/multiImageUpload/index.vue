<template>
  <section>
    <input
      type="file"
      ref="file"
      @change="onFileChange"
      v-toggle-attr="isSingle"
      v-on="$attrs"
      style="display:none"
    />

    <section class="file-upload">
      <v-btn
        class="button button--upload"
        small
        text
        @click="openFileUpload"
        v-on="$attrs"
        title="upload Image"
      >
        <!-- <i class="icon-upload upload_icon"></i> -->
        <v-icon dark> mdi-cloud-upload</v-icon>
        <!-- <span class="upload_icon">Hoss</span> -->
      </v-btn>
      <div class="image__placeholder">
        <span class="file-upload__image__placeholder ">{{
          $t("label.upload_media_gallery")
        }}</span>
      </div>
    </section>

    <v-row>
      <v-col
        cols="12"
        lg="2"
        sm="3"
        v-for="(showImg, index) in ShowImgs"
        :key="index"
        class="img_pointer my-2 mt-4 px-2"
      >
        <v-img aspect-ratio="1.5" :src="showImg" alt class=" ml-2 show-photo" />
        <v-icon
          v-if="imgsUrl[index]"
          @click="handleUpdatePhoto(index)"
          :title="$t('label.edit')"
          small
          class="edit-icon"
          >mdi-pencil</v-icon
        >
        <!-- <i
          class="icon-close close_icon"
          @click="deleteIamge($event, index, ShowImgs)"
          title="delete photo"
        ></i> -->

        <!-- temporarely ----------------------------->
        <v-icon
          class="close_icon"
          @click="deleteIamge($event, index, ShowImgs, showImg)"
          :title="$t('label.delete')"
        >
          mdi-close
        </v-icon>
        <!-- temporarely ----------------------------->
      </v-col>
    </v-row>

    <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <v-card-text class="subheading">{{ ImageErrorMsg }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="errorDialog = false" text>Got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { isValidImgType, isValidImgSize } from "@/utils/validate";
import { deleteMedia } from "@/api/media.js";
import { UpdateMedia } from "@/helpers/apiMethods";

export default {
  props: {
    imgsUrl: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    maxHeight: {
      type: Number,
      default: 200
    },
    minHeight: {
      type: Number,
      default: 200
    },
    reset: {
      type: Boolean,
      default: false
    },
    fieldName: {
      type: String,
      default: ""
    },
    maxSize: {
      type: Number,
      default: 1
    },
    value: {
      type: String
    }
  },

  watch: {
    reset: {
      handler(newValue) {
        if (newValue) {
          this.resetImageFile();
        }
      },
      immediate: true
    },
    imgsUrl: {
      handler(value) {
        const imgsPaths = value.map(el => el.path);
        this.ShowImgs = [...imgsPaths, ...this.ShowImgsCopy];
      },
      immediate: true
    }
  },
  data() {
    return {
      ShowImgs: [],
      ShowImgsCopy: [],
      imgsFiles: [],
      errorDialog: null,
      errorText: "",
      errorType: "",
      editCase: false,
      photoIndex: "",
      isSingle: false
    };
  },
  methods: {
    openFileUpload() {
      this.isSingle = false;
      this.editCase = false;
      this.$nextTick(() => this.$refs.file.click());
    },
    handleUpdatePhoto(index) {
      console.log(index);
      this.photoIndex = index;
      this.editCase = true;
      this.isSingle = true;
      this.$nextTick(() => this.$refs.file.click());
    },

    deleteIamge($event, index, imgs, showImg) {
      this.change = false;

      let key = this.imgsFiles[this.imgsFiles.length];

      const { id } = this.imgsUrl[index] ? this.imgsUrl[index] : {};
      if (id !== undefined) {
        this.popUp().then(value => {
          if (!value.dismiss) {
            deleteMedia(id)
              .then(() => {
                // this.ShowImgs.splice(index, 1);
                this.ShowImgsCopy.splice(index, 1);
                this.ShowImgsCopy = this.ShowImgsCopy.filter(
                  el => el !== showImg
                );

                // this.imgsFiles.splice(key, 1);.
                this.$emit("handle_delete_image", index);
              })
              .catch(err => console.log(err));
          }
        });
      } else {
        imgs.splice(index, 1);
        this.imgsFiles.splice(key, 1);
        this.ShowImgsCopy = this.ShowImgsCopy.filter(el => el !== showImg);

        this.$refs.file.value = "";
      }
    },
    updatephoto(imgFile) {
      // in case update
      let formData = new FormData();
      formData.append("file", imgFile);
      formData.append("_method", "PUT");
      formData.append("locale", "en");
      if (this.photoIndex) {
        const { id } = this.imgsUrl[this.photoIndex];
        UpdateMedia({ id, data: formData })
          .then(res => {
            const { media } = res.data;

            this.$set(this.ShowImgs, this.photoIndex, media.path);
            this.editCase = false;
            this.isSingle = false;
            this.imgsFiles = [];
          })
          .catch(err => console.log(err));
      }
    },

    onFileChange(e) {
      let imgFiles = e.target.files;
      //   console.log(imgFiles);
      for (let i = 0; i < imgFiles.length; i++) {
        const fileReader = new FileReader(); // important

        if (this.validateType(imgFiles[i])) {
          if (this.validateSize(imgFiles[i])) {
            this.imgsFiles.push(imgFiles[i]);

            fileReader.addEventListener("load", () => {
              if (!this.editCase) {
                this.ShowImgs.push(fileReader.result);
                this.ShowImgsCopy.push(fileReader.result);
              }
            });
          }
        }
        fileReader.readAsDataURL(imgFiles[i]);
      }

      this.readImage(this.imgsFiles);
    },
    readImage(imgsFiles) {
      this.$emit("fileSelected", imgsFiles);
      if (this.editCase) {
        this.updatephoto(imgsFiles[0]);
      }
    },
    validateSize(file) {
      if (isValidImgSize(file.size, this.maxSize)) {
        return true;
      } else {
        this.errorType = "SIZE";
        this.errorDialog = true;
        return false;
      }
    },
    validateDimentions(file) {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = URL.createObjectURL(file);
        image.addEventListener(
          "load",
          () => {
            let width = image.naturalWidth;
            let height = image.naturalHeight;
            if (width !== this.width && height !== this.height) {
              reject(false);
            } else {
              resolve(true);
            }
          },
          false
        );
      });
    },
    validateType(file) {
      if (isValidImgType(file)) {
        return true;
      } else {
        this.errorType = "MIME";
        this.errorDialog = true;

        return false;
      }
    },
    resetImageFile() {
      // this.imgsUrl = null;
      this.imgsFiles = [];
      this.ShowImgsCopy = [];
      this.$refs.file.value = "";
    }
  },
  computed: {
    ImageErrorMsg() {
      if (this.errorType === "MIME") {
        return this.$t("validation.imageType");
      } else if (this.errorType === "SIZE") {
        return this.$t("validation.imageSize", { count: this.maxSize });
      } else if (this.errorType === "DIMENSIONS") {
        return this.$t("validation.imageDimensions", {
          width: this.width,
          height: this.height
        });
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.upload_file_section {
  border: 1px solid #ccc;
  padding: 20px !important;
  cursor: pointer;
  /* width: 86px; */
  height: 100px;
  width: a;
  border-radius: 4px;
  background-color: #fafbfb;
}
.upload_file_section:hover .upload_icon {
  animation: move infinite 0.8s ease-in-out;
  color: rgb(38, 163, 235);
  /* transition: all 0.5s ease-in-out; */
}
.upload_icon {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 20px;
}
.show-photo {
  border-radius: 3px;
  position: relative;
}
.edit-icon {
  position: absolute;
  top: 12px;
  right: 8px;
  background-color: #fff;
  box-shadow: 0 2px 10px #444;
  transition: all 0.5s ease;
  &:hover {
    color: brown;
  }
}
.image__placeholder {
  border: 1px solid #ccc;
  border-right: 0;

  height: 56px;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(193, 193, 193, 0.5);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: transparent;
  overflow: hidden;
}
@keyframes move {
  0% {
    transform: translateY(15px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
