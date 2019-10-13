<template>
  <!-- Image Preview -->
  <v-dialog v-model="showDialog" max-width="500" persistent>
    <section class="img-preview-overlay">
      <i
        class="icon-close img-preview-close hover-pointer"
        @click="closePreview"
        :title="$t('labels.close')"
      ></i>
      <div class="img-preview-container">
        <img class="img-preview-img" :src="imagePath" />
      </div>
    </section>
  </v-dialog>
  <!-- Image Preview -->
</template>

<script>
export default {
  name: "image-preview",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    imagePath: {
      type: String,
      default: ""
    }
  },
  methods: {
    closePreview() {
      this.$emit("closePreview");
    }
  }
};
</script>
