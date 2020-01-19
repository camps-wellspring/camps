<template>
  <!-- Image Preview -->
  <v-dialog
    v-model="showDialog"
    max-width="500"
    @click:outside="closePreview"
    @keydown.esc="closePreview"
  >
    <section class="img-preview-overlay">
      <!-- <i
        class="icon-close img-preview-close hover-pointer"
        @click="closePreview"
        :title="$t('label.close')"
      ></i> -->
      <v-icon
        class="img-preview-close"
        @click="closePreview"
        :title="$t('label.close')"
      >
        mdi-close
      </v-icon>
      <!-- <span class="img-preview-close" @click="closePreview">{{
        $t("label.hoss")
      }}</span> -->

      <div class="img-preview-container">
        <img class="img-preview-img" fluid :src="imagePath" />
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
