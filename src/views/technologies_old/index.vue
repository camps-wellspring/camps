<template>
  <div class="technologies">
    <v-container>
      <div>
        <v-spacer />
        <v-btn class="primary" @click="initDialog(false)">{{
          $t("button.create")
        }}</v-btn>
      </div>
      <global-toolbar title="technologies" />
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
              <v-btn icon @click="initDialog(true, item)">
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
        <template #body v-if="dialog.edit">
          <component
            :cur-item="editingItem"
            :is="isEdit ? 'editItem' : 'createItem'"
          />
        </template>
      </DialogComponent>
    </v-container>
  </div>
</template>

<script>
import generateTableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";

export default {
  name: "Technologies",

  components: {
    createItem: () => import("./components/create"),
    editItem: () => import("./components/edit")
  },
  data() {
    return {
      headerValues: ["name", "icon", "url", "actions"],
      items: [],
      isEdit: false,
      editingItem: {},
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

    initDialog(state, curItem) {
      this.isEdit = state;
      state && (this.editingItem = curItem);
      this.dialog.edit = true;
    },

    handleDelete(id, index) {
      this.popUp(this.$t("message.delete")).then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: "technologies", id })
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
