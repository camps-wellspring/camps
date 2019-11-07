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
      :items-per-page="20"
      :loading="tableLoading"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.position }}</td>
          <td :title="item.bio">{{ item.bio | truncate }}</td>
          <td>
            <v-avatar size="50">
              <v-img
                aspect-ratio="1"
                :src="
                  item.main_image
                    ? item.main_image.path
                    : '@/assets/imgs/user.jpg'
                "
              ></v-img>
            </v-avatar>
          </td>
          <td>
            <v-icon medium title="edit"> mdi-pencil</v-icon>
            <v-icon medium title="delete" @click="handleDelete(item, index)">
              mdi-delete</v-icon
            >
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
        <form-component
          @click="dialog = false"
          @close_dialog="dialog = false"
          @set_memeber="handleSetMember"
        />
      </template>
    </DialogComponent>
    <!-- dialog -->
  </div>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";
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
    handleDelete({ slug }, index) {
      DeleteData({ reqName: "members", id: slug })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSetMember(item) {
      console.log(item);
      this.items.push(item);
    },
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
