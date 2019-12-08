<template>
  <div class="exhibition">
    <global-toolbar
      title="gallery_exhibition"
      :loading="loading.submit"
      :disabled="newPhotos.length < 1"
      class="mb-12"
      action-button
      action-button-text="save"
      @ButtonClicked="savePhotos"
    />

    <v-container>
      <multi-image-upload
        ref="imgUpload"
        :maxSize="4"
        :imgsUrl="items"
        @fileSelected="newPhotos = $event"
        @handle_delete_image="items.splice($event, 1)"
      />
    </v-container>
  </div>
</template>

<script>
import { IndexData, StoreData } from "@/helpers/apiMethods";

export default {
  name: "exhibition",

  data() {
    return {
      items: [],
      reset: false,
      newPhotos: [],

      loading: {
        fetch: false,
        submit: false
      }
    };
  },

  created() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      this.loading.fetch = true;
      IndexData({ reqName: "photos-galleries", query: { pagination: "all" } })
        .then(res => {
          this.items = res.data.data;
          this.newPhotos = [];
          this.$refs.imgUpload.resetImageFile();
          this.loading.fetch = false;
        })
        .catch(() => {
          this.loading.fetch = false;
        });
    },

    savePhotos() {
      this.loading.submit = true;
      let data = new FormData();
      this.newPhotos.forEach((photo, i) => data.append(`photos[${i}]`, photo));
      StoreData({ reqName: "photos-galleries", data })
        .then(() => {
          this.loading.submit = false;
          this.fetchItems();
        })
        .catch(() => {
          this.loading.submit = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.theme--light.v-sheet {
  background-color: transparent !important;
}
</style>
