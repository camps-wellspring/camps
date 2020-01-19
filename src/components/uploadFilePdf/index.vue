<template>
  <div>
    <!-- <v-img :src="pdfFile || ''" max-height="300" /> -->
    <input type="file" ref="file" @change="onFileChange" style="display:none" />

    <a
      class="file-upload__image__placeholder hover-pointer"
      :class="{ 'file-upload__image__placeholder--active': pdfFile }"
      :href="fileUrl"
      target="_blank"
      >{{ imageName ? imageName : $t("label.upload_book") }}</a
    >
    <v-btn
      class="button button--upload"
      small
      text
      @click="$refs.file.click()"
      v-on="$attrs"
      :title="$t('label.upload_book')"
    >
      <v-icon dark> mdi-cloud-upload</v-icon>
    </v-btn>

    <v-dialog v-model="errorDialog" max-width="300" persistent>
      <v-card>
        <v-card-text class="subheading">{{ FileErrorMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="resetData">{{ $t("button.got_it") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { isValidPdfFile, isValidImgSize } from "@/utils/validate";
import { UpdateMedia } from "@/helpers/apiMethods";

export default {
  props: {
    maxSize: {
      type: Number,
      default: 1
    },
    fileUrl: {
      type: String,
      default: null
    },
    fileId: {
      type: Number,
      default: null
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
    },
    resetToggle: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    reset: {
      handler(value) {
        if (value) {
          this.resetFile();
        }
      },
      immediate: false
    },
    resetToggle: {
      handler(value) {
        if (value) {
          this.resetFile();
        }
      },
      immediate: true
    },
    fileUrl: {
      handler(newValue) {
        if (newValue) {
          this.imageName = this.$t("label.show_image");
          this.pdfFile = newValue;
        }
      },
      immediate: true
    }
  },
  computed: {
    FileErrorMessage() {
      if (this.errorType === "MIME") {
        return this.$t("validation.file_type");
      } else if (this.errorType === "SIZE") {
        return this.$t("validation.file_size", { count: this.maxSize });
      } else {
        return "";
      }
    }
  },
  data() {
    return {
      imageName: null,
      pdfFile: null,
      errorDialog: null,
      errorText: "",
      errorType: "",
      //   imagePreview: "",
      absolute: false,
      overlay: false,
      zIndex: 990
    };
  },
  methods: {
    onFileChange(e) {
      if (e.target.files.length > 0) {
        let File = e.target.files[0];
        if (this.isValidPdfFileType(File)) {
          this.readImage(File);
        }
      }
    },
    readImage(File) {
      if (this.validateSize(File)) {
        // console.log("image file", File);
        this.imageName = File.name;
        this.pdfFile = URL.createObjectURL(File);
        if (File) {
          let dataObj = {
            file: File
          };
          if (this.fieldName) {
            dataObj.name = this.fieldName;
            this.$emit("file_selected", dataObj);
          } else {
            this.$emit("file_selected", dataObj);
          }

          if (this.fileId) {
            this.autoUpdate(dataObj.file);
          }
        }
      }
    },
    autoUpdate(image) {
      let formData = new FormData();
      formData.append("file", image);
      formData.append("_method", "PUT");
      formData.append("locale", "en");

      UpdateMedia({ id: this.fileId, data: formData })
        .then(res => {
          const { media } = res.data;
          this.$emit("FileUpdated", media);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // },
    validateSize(file) {
      if (isValidImgSize(file.size, this.maxSize)) {
        return true;
      } else {
        this.errorType = "SIZE";
        this.errorDialog = true;
        return false;
      }
    },
    isValidPdfFileType(file) {
      if (isValidPdfFile(file)) {
        return true;
      } else {
        this.errorType = "MIME";
        this.errorDialog = true;
        return false;
      }
    },
    resetFile() {
      this.imageName = this.$t("label.upload_book");
      this.pdfFile = null;
      this.$refs.file.value = "";
    },
    resetData() {
      this.$refs.file.value = "";
      this.errorDialog = false;
      setTimeout(() => {
        this.errorType = "";
      }, 300);
    },
    showImagePreview() {
      if (this.pdfFile) {
        this.overlay = true;
      }
    }
  }
};
</script>

<style></style>
