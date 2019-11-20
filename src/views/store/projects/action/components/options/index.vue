<template>
  <v-card>
    <v-card-title>{{ $t("heading.options") }}</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              multiple
              outlined
              :label="$t('label.categories')"
              :items="options.categories"
              item-text="name"
              item-value="id"
              @input="$emit('categoriesUpdated', $event)"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              multiple
              outlined
              :label="$t('label.technologies')"
              :items="options.technologies"
              item-text="name"
              item-value="id"
              @input="$emit('technologiesUpdated', $event)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
