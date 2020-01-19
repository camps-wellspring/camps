<template>
  <v-card class="no-data">
    <v-card-text>
      <v-img
        class="no-data__img mt-12 mb-8 mx-auto"
        :src="items[type] ? items[type].path : ''"
      />
      <v-card-title class="text-center">
        <p>{{ items[type].text }}</p>
      </v-card-title>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "results",
      required: true
    }
  },
  data() {
    return {
      items: {
        // EXAMPLE =============>
        results: {
          // path: require("@/assets/imgs/no-results.svg"),
          // text: this.$t("message.no_results")
        }
      }
    };
  }
};
</script>
