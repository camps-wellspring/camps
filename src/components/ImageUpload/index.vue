<template>
  <div>
    <v-card>
      <v-img
        :src="ImageUrl || imgUrl || require('@/assets/imgs/Default.png')"
        :max-height="maxHeight"
        :min-height="minHeight"
        :error-messages="
          $store.getters.getServerErrors
            ? $store.getters.getServerErrors['main_image']
            : ''
        "
      />
      <!-- <v-img :src="ImageUrl || ''" max-height="300" /> -->
      <input
        type="file"
        ref="file"
        @change="onFileChange"
        style="display:none"
      />
      <div class="text-xs-center mt-3 mb-3">
        <v-btn small @click="$refs.file.click()">
          <span class="mx-2"> {{ $t("buttons.choose") }}</span>
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
      </div>
    </v-card>

    <v-dialog v-model="errorDialog" max-width="300" persistent>
      <v-card>
        <v-card-text class="subheading">{{ ImageErrorMsg }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="resetData" flat>{{ $t("buttons.got_it") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { isValidImgType, isValidImgSize } from "@/utils/validate";
export default {
  props: {
    maxSize: {
      type: Number,
      default: 1
    },
    imgUrl: {
      type: String,
      default: null
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
      }
      //   immediate: true
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
  },
  data() {
    return {
      ImageUrl: null,
      errorDialog: null,
      errorText: "",
      errorType: ""
    };
  },
  methods: {
    onFileChange(e) {
      if (e.target.files.length > 0) {
        let imageFile = e.target.files[0];
        // with Dimensions
        if (this.width && this.height) {
          if (this.validateType(imageFile)) {
            this.validateDimentions(imageFile)
              .then(() => {
                this.readImage(imageFile);
              })
              .catch(() => {
                this.errorType = "DIMENSIONS";
                this.errorDialog = true;
              });
          }
          // without Dimensions
        } else {
          if (this.validateType(imageFile)) {
            this.readImage(imageFile);
          }
        }
      }
    },
    readImage(imageFile) {
      if (this.validateSize(imageFile)) {
        this.ImageUrl = URL.createObjectURL(imageFile);
        if (imageFile) {
          let dataObj = {
            file: imageFile
          };
          if (this.fieldName) {
            dataObj.name = this.fieldName;
            this.$emit("fileSelected", dataObj);
          } else {
            this.$emit("fileSelected", dataObj);
          }
        }
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
    validateSize(file) {
      if (isValidImgSize(file.size, this.maxSize)) {
        return true;
      } else {
        this.errorType = "SIZE";
        this.errorDialog = true;
        return false;
      }
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
      console.log("reset");
      this.ImageUrl = null;
      this.$refs.file.value = "";
    },
    resetData() {
      this.$refs.file.value = "";
      this.errorDialog = false;
      setTimeout(() => {
        this.errorType = "";
      }, 300);
    }
  }
};
</script>

<style></style>
