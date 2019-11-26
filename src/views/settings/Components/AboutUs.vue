<template>
  <div>
    <v-col cols="12">
      <new-image-upload
        class="file-upload__image"
        :imgUrl="about_photo && about_photo.path"
        @fileSelected="uploadPhoto"
        :maxSize="imageSize"
      />
    </v-col>
    <WrappingComponent :settings="settings" :formData="form" />
  </div>
</template>

<script>
import { StoreData } from "@/helpers/apiMethods";

export default {
  name: "AboutPage",
  props: {
    settings: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    WrappingComponent: () => import("./WrappingComponent")
  },

  data() {
    return {
      form: {
        about_description: "",
        about_our_vision: "",
        about_our_mission: "",
        about_our_message: "",
        about_our_schedule: "",
        about_why_solutionplus: ""
      },
      about_photo: "",
      imageSize: 3
    };
  },
  methods: {
    uploadPhoto({ file }) {
      const formData = new FormData();
      formData.append("about_photo", file);
      StoreData({ reqName: "settings", data: formData }).catch(err =>
        console.log(err)
      );
    }
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          this.about_photo = settings["about_photo"];
        }
      },
      immediate: true
    }
  }
};
</script>
