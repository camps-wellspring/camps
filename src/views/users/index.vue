<template>
  <main>
    <current-path />
    <v-card class="mx-5">
      <v-card-title>
        <global-toolbar
          title="hoss"
          actionButtonText="create"
          :actionButton="true"
          @ButtonClicked="buttonClicked"
        />
      </v-card-title>
      <v-card-text>
        <section class="mt-2 mx-5">
          <locale-select @change="fireLocaleChange" />
        </section>

        <section class="mx-5">
          <google-maps
            class="my-3"
            @markerUpdated="getMarker"
            :currentMarkers="markers"
            :zoomValue="zoom"
          />
        </section>

        <section class="file-upload mt-2 mx-5">
          <new-image-upload
            class="file-upload__image"
            :imgUrl="test.main_image ? test.main_image.path : ''"
            :resetToggle="resetImage"
            @fileSelected="imageChange"
          />
        </section>

        <section class="file-upload__gallery mt-2">
          <multi-image-upload
            class="file-upload__gallery--upload"
            :maxSize="photosSize"
            @fileSelected="handleMultiPhotos"
            @handle_delete_image="handleDelteImag"
            :imgsUrl="handleReturnPhotos()"
          />
        </section>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :title="$t('labels.hoss')">{{
          $t("labels.hoss")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </main>
</template>

<script>
export default {
  name: "UsersPage",
  data() {
    return {
      filterMode: true,
      filterValidation: true,
      filterLoading: false,
      resetImage: false,
      test: {
        main_image: ""
      },
      photosSize: 1.024,
      form: {
        photos: [],
        media: [],
        lat: null,
        lng: null
      },
      markers: [{ lat: 0, lng: 0 }],
      zoom: 15
    };
  },
  methods: {
    getMarker(markers) {
      this.form.lat = markers.lat;
      this.form.lng = markers.lng;
    },
    buttonClicked() {
      console.log("Button Clicked");
    },
    clearFilter() {
      console.log("Clear Filter");
    },
    fireLocaleChange(locale) {
      console.log("localeChange", locale);
    },
    imageChange(photo) {
      this.test.main_image = photo.file;
    },
    handleMultiPhotos(photos) {
      this.form.photos = photos;
    },
    handleDelteImag(index) {
      this.form.media.splice(index, 1);
    },
    handleReturnPhotos() {
      if (this.form.media) {
        return this.form.media;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
