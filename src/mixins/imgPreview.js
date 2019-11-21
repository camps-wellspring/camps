export default {
  data() {
    return {
      imgPreviewDialog: false,
      currImg: ""
    };
  },

  methods: {
    handleImgPreview(path) {
      // path = path.replace("blob:", "");
      this.currImg = path;
      console.log("TCL: handleImgPreview -> this.currImg", this.currImg);
      this.imgPreviewDialog = true;
    },

    closePreview() {
      this.imgPreviewDialog = false;
    }
  }
};
