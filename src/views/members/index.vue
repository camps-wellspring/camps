<template>
  <div>
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.members") }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="showDialog">
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
          <td>
            <v-img aspect-ratio="1" src="@/assets/imgs/user.jpg"></v-img>
          </td>
          <td>
            <v-icon medium title="edit"> mdi-pencil</v-icon>
            <v-icon medium title="delete"> mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- table -->
    <!-- dialog -->
    <DialogComponent v-model="dialog">
      <template #heading>
        <v-card-title>{{ dialogTitle }}</v-card-title>
      </template>
      <template #body>
        <form-component @click="dialog = false" />
      </template>
      <!-- <template #actions>
        <v-btn class="primary">save</v-btn>
        <v-btn class="warning" @click="dialog = false">close</v-btn>
      </template> -->
    </DialogComponent>
    <!-- dialog -->
  </div>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { IndexData } from "@/helpers/apiMethods";
export default {
  name: "Memebers",
  components: {
    FormComponent: () => import("./formComponent")
  },
  data() {
    return {
      headers: [],
      items: [],
      tableLoading: true,
      dialog: false,
      isEdit: false,
      dialogTitle: this.isEdit
        ? this.$t("heading.edit")
        : this.$t("heading.create")
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
    },
    showDialog() {
      this.dialog = !this.dialog;
    }
  }
};
</script>
