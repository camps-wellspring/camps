<template>
  <section class="demo-types">
    <global-toolbar
      title="demo_types"
      action-button
      action-button-text="create"
      @ButtonClicked="initDialog(false)"
    />
    <v-data-table :headers="headers" :items="items" hide-default-footer :loading="loading.table">
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ item.name }}</td>

          <td class="table-logo">
            <v-avatar class="square">
              <img
                :src="item.template && item.template.path"
                :alt="item.template && item.template.description"
                @click="handleImgPreview(item.template && item.template.path)"
            /></v-avatar>
          </td>

          <td class="text-center">
            <toggle-service
              :is-edit="true"
              model-name="demo-types"
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
              <v-icon medium title="delete" @click="handleDelete(item.id, index)">
                mdi-delete</v-icon
              >
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <DialogComponent v-model="dialog">
      <template #heading>
        <v-card-title>{{ dialogTitle }}</v-card-title>
      </template>
      <template #body v-if="dialog">
        <component
          :cur-item="editingItem"
          @closed="handleDialogClose"
          :is="isEdit ? 'editItem' : 'createItem'"
        />
      </template>
    </DialogComponent>

    <global-image-preview
      :image-path="currImg"
      :show-dialog="imgPreviewDialog"
      @closePreview="closePreview"
    />
  </section>
</template>

<script>
import generateTableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";
import imgPreviewMixin from "@/mixins/imgPreview";

export default {
  name: "DemoTypes",

  mixins: [imgPreviewMixin],

  components: {
    createItem: () => import("./components/create"),
    editItem: () => import("./components/edit")
  },

  data() {
    return {
      headerValues: ["name", "template", "visible", "actions"],
      items: [],
      isEdit: false,
      editingItem: {},
      loading: {
        table: false
      },
      dialog: false
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
      IndexData({ reqName: "demo-types" })
        .then(res => {
          this.items = res.data.data;
          this.loading.table = false;
        })
        .catch(() => (this.loading.table = false));
    },

    initDialog(state, currItem) {
      this.isEdit = state;
      state && (this.editingItem = currItem);
      this.dialog = true;
    },

    handleDialogClose() {
      this.dialog = false;
      this.fetchItems();
    },

    handleDelete(id, index) {
      this.popUp(this.$t("message.delete")).then(value => {
        if (!value.dismiss) {
          this.loading.table = true;
          DeleteData({ reqName: "demo-types", id })
            .then(() => {
              this.items.splice(index, 1);
              this.loading.table = false;
            })
            .catch(() => {
              this.loading.table = false;
            });
        }
      });
    }
  }
};
</script>
