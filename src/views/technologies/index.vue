<template>
  <div class="technologies">
    <v-container>
      <global-toolbar title="technologies" actions-type="filter" filter-mode />
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        :loading="loading.table"
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ item.name }}</td>
            <td class="table-logo">
              <v-avatar class="square">
                <img :src="item.icon.path" :alt="item.icon.description"
              /></v-avatar>
            </td>
            <td>{{ item.url }}</td>
            <td>
              <v-btn icon @click="initDialog(true)">
                <v-icon medium title="edit">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon
                  medium
                  title="delete"
                  @click="handleDelete(item.id, index)"
                >
                  mdi-delete</v-icon
                >
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <DialogComponent v-model="dialog.edit">
        <template #heading>
          <v-card-title>{{ dialogTitle }}</v-card-title>
        </template>
        <template #body> </template>
      </DialogComponent>
    </v-container>
  </div>
</template>

<script>
import generateTableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";

export default {
  name: "Technologies",
  data() {
    return {
      headerValues: ["name", "logo", "url", "actions"],
      items: [],
      isEdit: false,
      loading: {
        table: false
      },
      dialog: {
        edit: false
      }
    };
  },

  computed: {
    headers() {
      return generateTableHeaders(this.headerValues);
    },
    dialogTitle() {
      return this.isEdit ? this.$t("heading.edit") : this.$t("heading.create");
    }
  },

  created() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      this.loading.table = true;
      IndexData({ reqName: "technologies" }).then(res => {
        this.items = res.data.data;
        this.loading.table = false;
      });
    },

    initDialog(state) {
      console.log("TCL: initDialog -> state", this.isEdit);
      this.isEdit = state;
      this.dialog.edit = true;
    },

    handleDelete(id, index) {
      this.popUp(this.$t("message.delete")).then(value => {
        if (!value.dismiss) {
          DeleteData(id)
            .then(() => {
              this.items.splice(index, 1);
            })
            .catch(err => console.log(err));
        }
      });
    }
  }
};
</script>
