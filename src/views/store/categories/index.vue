<template>
  <div class="store-categories">
    <v-container>
      <global-toolbar
        title="store-categories"
        action-button
        action-button-text="create"
        @ButtonClicked="initDialog(false)"
      />
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        :loading="loading.table"
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td>
              <read-more
                class="read-more"
                :text="item.name"
                :max-chars="20"
                less-str="read less"
              />
            </td>

            <td class="table-logo">
              <v-avatar
                @click="handleImgPreview(item.icon.path)"
                class="square"
              >
                <img :src="item.icon.path" :alt="item.icon.description"
              /></v-avatar>
            </td>

            <td>
              <v-btn small depressed :color="item.color" />
            </td>

            <td>
              <v-btn icon @click="initDialog(true, item)">
                <v-icon medium title="edit">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon
                  medium
                  title="delete"
                  @click="handleDelete(item.slug, index)"
                >
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
    </v-container>

    <global-image-preview
      :image-path="currImg"
      :show-dialog="imgPreviewDialog"
      @closePreview="closePreview"
    />
  </div>
</template>

<script>
import generateTableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";
import imgPreviewMixin from "@/mixins/imgPreview";

export default {
  name: "Store_Categories",

  mixins: [imgPreviewMixin],

  components: {
    createItem: () => import("./components/create"),
    editItem: () => import("./components/edit")
  },

  data() {
    return {
      headerValues: ["name", "icon", "color", "actions"],
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
      IndexData({ reqName: "store-categories" })
        .then(res => {
          this.items = res.data.data;
          this.loading.table = false;
        })
        .catch(() => (this.loading.table = false));
    },

    initDialog(state, curItem) {
      this.isEdit = state;
      state && (this.editingItem = curItem);
      this.dialog = true;
    },

    handleDialogClose() {
      this.dialog = false;
      this.fetchItems();
    },

    handleDelete(slug, index) {
      console.log("TCL: handleDelete -> slug", slug);
      this.popUp(this.$t("message.delete")).then(value => {
        if (!value.dismiss) {
          this.loading.table = true;
          DeleteData({ reqName: "store-categories", id: slug })
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
