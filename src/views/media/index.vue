<template>
  <div class="media">
    <global-toolbar
      title="media"
      :loading="loading.submit"
      :disabled="newPhotos.length < 1"
      class="mb-12"
      action-button
      action-button-text="save"
      @ButtonClicked="savePhotos"
    />

    <div class="d-flex align-baseline justify-center">
      <span class="mx-3" v-text="$t('label.releases')" />
      <v-switch
        v-model="type"
        inset
        hide-details
        class="mx-4"
        true-value="events"
        false-value="releases"
        :loading="loading.fetch"
      />
      <span v-text="$t('label.events')" />
    </div>

    <v-container>
      <multi-image-upload
        ref="imgUpload"
        :maxSize="4"
        :imgsUrl="photos"
        @fileSelected="newPhotos = $event"
        @handle_delete_image="photos.splice($event, 1)"
      />
    </v-container>
  </div>
</template>

<script>
import { IndexData, StoreData } from "@/helpers/apiMethods";

export default {
  name: "media",

  data() {
    return {
      photos: [],
      newPhotos: [],

      type: "events",

      loading: {
        fetch: false,
        submit: false
      }
    };
  },

  watch: {
    type: {
      immediate: true,
      handler() {
        this.fetchItems();
      }
    }
  },

  methods: {
    fetchItems() {
      this.loading.fetch = true;
      const query = { pagination: "all" };
      this.type === "releases"
        ? (query.releases = true)
        : (query.events = true);
      IndexData({ reqName: "photos-galleries", query })
        .then(res => {
          this.photos = res.data.data;
          this.newPhotos = [];
          this.$refs.imgUpload.resetImageFile();
          this.loading.fetch = false;
        })
        .catch(() => {
          this.type === "events" ? "releases" : "events";
          this.loading.fetch = false;
        });
    },

    savePhotos() {
      this.loading.submit = true;
      let data = new FormData();
      this.newPhotos.forEach((photo, i) => data.append(`photos[${i}]`, photo));
      data.append("title", this.type);
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
