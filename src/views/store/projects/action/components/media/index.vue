<template>
  <v-card>
    <v-card-title>{{ $t("heading.media") }}</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <form-group name="main_media">
              <template slot-scope="{ attrs }">
                <multi-image-upload
                  v-bind="attrs"
                  :maxSize="2"
                  :imgsUrl="getPhotos()"
                  @fileSelected="$emit('ImgSelected', $event)"
                  @handle_delete_image="$emit('ImgDeleted', $event)"
                />
              </template>
            </form-group>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    photos: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    getPhotos() {
      if (this.photos) {
        const photos = this.photos;
        this.photos.forEach((photo, i) => photo.main && photos.splice(i, 1));
        return photos;
      }
    }
  }
};
</script>
