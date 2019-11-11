export default {
  data() {
    return {
      imgPreviewDialog: false,
      currImg: ""
    };
  },

  methods: {
    handleImgPreview(path) {
      this.currImg = path;
      this.imgPreviewDialog = true;
    },

    closePreview() {
      this.imgPreviewDialog = false;
    }
  }
};
