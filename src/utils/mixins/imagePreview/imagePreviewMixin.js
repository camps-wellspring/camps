export const imagePreviewMixin = {
  data() {
    return {
      overlay: false,
      currentPreviewImage: ""
    };
  },
  methods: {
    showImagePreview(image) {
      if (image) {
        this.currentPreviewImage = image.path;
        this.overlay = true;
      }
    }
  }
};
