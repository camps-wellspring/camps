<template>
  <div>
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.members") }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary">
        {{ $t("button.create") }}
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "Memebers"
};
</script>

<style lang="scss" scoped></style>
