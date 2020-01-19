<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>{{ $t("heading.events") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="handleOpenDialog" class="primary">{{
        $t("button.create")
      }}</v-btn>
    </v-toolbar>
    <!-- table -->
    <WrappingTable ref="table_ref" :headersName="headers" pathName="events">
      <template slot-scope="{ item, index }">
        <td>
          <v-avatar size="50">
            <v-img
              @click="showImagePreview(item.main_image)"
              class="hover-pointer"
              aspect-ratio="1"
              :src="item.main_image && item.main_image.path"
            ></v-img>
          </v-avatar>
        </td>
        <td class="pa-3">
          {{ item.serial }}
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.event_date.date }}</td>
        <td>
          <v-icon small title="edit" @click="handleEdit(item, index)">
            mdi-pencil</v-icon
          >
          <v-icon small title="delete" @click="handleDelete(item, index)">
            mdi-delete</v-icon
          >
        </td>
      </template>
    </WrappingTable>
    <!-- table -->
  </div>
</template>

<script>
export default {
  name: "Events",
  data() {
    return {
      headers: ["image", "serial", "name", "date", "configs"],
      btnLoading: false
    };
  },
  methods: {
    handleDelete({ slug }, index) {
      this.$refs.table_ref.handleDelete(slug, index);
    }
  }
};
</script>

<style lang="scss" scoped></style>
