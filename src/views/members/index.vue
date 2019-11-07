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
    <!-- table -->
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      :loading="tableLoading"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.position }}</td>
          <td :title="item.bio">{{ item.bio | truncate }}</td>
        </tr>
      </template>
    </v-data-table>
    <!-- table -->
  </div>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { IndexData } from "@/helpers/apiMethods";
export default {
  name: "Memebers",
  data() {
    return {
      headers: [],
      items: [],
      tableLoading: true
    };
  },
  mounted() {
    this.createTableHeaders();
    this.handleGetMembers();
  },
  methods: {
    createTableHeaders() {
      const headersList = ["name", "position", "bio", "image", "configs"];
      this.headers = TableHeaders(headersList);
    },
    handleGetMembers() {
      IndexData({ reqName: "members" })
        .then(res => {
          const { data } = res.data;
          this.items = data;
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
