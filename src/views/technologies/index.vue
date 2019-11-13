<template>
  <section class="technologies">
    <global-toolbar
      title="technologies"
      action-button
      action-button-text="create"
      @ButtonClicked="initDialog('create')"
    />
    <v-data-table :headers="headers" :items="items" hide-default-footer :loading="loading.table">
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ item.name }}</td>

          <td class="table-logo">
            <v-avatar class="square">
              <img
                :src="item.icon.path"
                :alt="item.icon.description"
                @click="handleImgPreview(item.icon.path)"
            /></v-avatar>
          </td>

          <td>{{ item.url }}</td>

          <td>
            <v-btn icon @click="initDialog('update', item)">
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
          :curr-item="editingItem"
          @closed="handleDialogClose"
          :is="'action'"
          :action-type="actionType"
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
  name: "Technologies",

  mixins: [imgPreviewMixin],

  components: {
    action: () => import("./components/action")
  },

  data() {
    return {
      headerValues: ["name", "icon", "url", "actions"],
      items: [],
      actionType: "",
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
      return this.actionType ? this.$t("heading.edit") : this.$t("heading.create");
    }
  },

  created() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      this.loading.table = true;
      IndexData({ reqName: "technologies" })
        .then(res => {
          this.items = res.data.data;
          this.loading.table = false;
        })
        .catch(() => (this.loading.table = false));
    },

    initDialog(type, currItem) {
      this.actionType = type;
      type === "update" && (this.editingItem = currItem);
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
          DeleteData({ reqName: "technologies", id })
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
