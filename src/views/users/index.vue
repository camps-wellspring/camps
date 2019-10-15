<template>
  <main>
    <current-path />
    <v-card class="mx-5">
      <v-card-title>
        <global-toolbar
          title="hoss"
          actionsType="filter"
          :filterMode="filterMode"
          :filterValidation="filterValidation"
          :stopLoading="!filterLoading"
          @Filter="filter"
          @ClearFilter="clearFilter"
        />
      </v-card-title>
      <v-card-text>
        <section class="file-upload mt-2 mx-5">
          <new-image-upload
            class="file-upload__image"
            :imgUrl="test.main_image ? test.main_image.path : ''"
            :resetToggle="resetImage"
            @fileSelected="imageChange"
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
      }
    };
  },
  methods: {
    filter() {
      console.log("Filter");
    },
    clearFilter() {
      console.log("Clear Filter");
    },
    imageChange(photo) {
      this.test.main_image = photo.file;
    }
  }
};
</script>

<style lang="scss" scoped></style>
