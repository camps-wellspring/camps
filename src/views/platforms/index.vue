<template>
  <div class="platforms">
    <v-container>
      <div>
        <v-spacer />
        <v-btn class="primary" @click="initDialog(false)">{{
          $t("button.create")
        }}</v-btn>
      </div>
      <global-toolbar title="platforms" />
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

            <td>
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn depressed :color="item.color" v-on="on" />
                </template>
                <v-color-picker :value="item.color" mode="hexa" />
              </v-menu>
            </td>

            <td class="text-center">
              <toggle-service
                :is-edit="true"
                model-name="platforms"
                :model-id="item.id"
                field="visible"
                v-model="item.visible"
                :validate="true"
              />
            </td>

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
  name: "Platforms",

  components: {
    createItem: () => import("./components/create"),
    editItem: () => import("./components/edit")
  },

  data() {
    return {
      headerValues: ["name", "logo", "color", "visible", "actions"],
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
      IndexData({ reqName: "platforms" }).then(res => {
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
          DeleteData({ reqName: "platforms", id })
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
