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
        <section class="mt-2 mx-5">
          <locale-select @change="fireLocaleChange" />
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
  name: "services",

  data() {
    return {
      filterMode: true,
      filterLoading: false
    };
  },
  computed: {
    filterValidation() {
      return true;
    }
  },
  methods: {
    filter() {
      console.log("Filter");
    },
    clearFilter() {
      console.log("Clear Filter");
    },
    fireLocaleChange(locale) {
      console.log("localeChange", locale);
    }
  }
};
</script>
