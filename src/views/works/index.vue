<template>
  <main>
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.works") }}</v-toolbar-title>
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
      :items-per-page="20"
      :loading="tableLoading"
    >
      <!-- expand column -->
      <template v-slot:item="{ item, isExpanded, expand }">
        <tr @click="expand((isExpanded = !isExpanded))">
          <td>
            <v-avatar size="50">
              <v-img
                aspect-ratio="1"
                :src="item.logo ? item.logo.path : '@/assets/imgs/user.jpg'"
              ></v-img>
            </v-avatar>
          </td>
          <td>{{ item.name }}</td>
          <td class="toggle-adjust">
            <toggle-service
              :is-edit="true"
              model-name="works"
              :model-id="item.id"
              field="visible"
              v-model="item.visible"
              :validate="true"
            />
          </td>
          <td>{{ item.priority }}</td>
          <td>{{ item.description | truncate }}</td>
          <td>
            <v-icon medium title="edit" @click="handleEdit(item, index)">
              mdi-pencil</v-icon
            >
            <v-icon medium title="delete" @click="handleDelete(item, index)">
              mdi-delete</v-icon
            >
          </td>
        </tr>
      </template>

      <!-- expand item/row -->
      <template v-slot:expanded-item="{ headers, item }">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Calories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ item }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </v-data-table>
    <!-- table -->
  </main>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";
export default {
  name: "Works",
  data() {
    return {
      headers: [],
      items: [],
      expanded: [],
      pagination: {},
      singleExpand: false,
      tableLoading: true
    };
  },
  mounted() {
    this.createTableHeaders();
    this.handleGetWorks();
  },
  methods: {
    handleEdit() {},
    handleDelete() {},
    handleExpand(props) {
      props.isExpanded = !props.isExpanded;
      console.log(props);
    },
    handleGetWorks() {
      IndexData({ reqName: "works" })
        .then(res => {
          const { data, meta } = res.data;
          this.items = data;
          this.pagination = meta;
          console.log(this.items);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    createTableHeaders() {
      const headersList = [
        "logo",
        "name",
        "visible",
        "priority",
        "description",
        "configs"
      ];
      this.headers = TableHeaders(headersList);
    }
  }
};
</script>
