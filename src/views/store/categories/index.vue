<template>
  <section class="store_categories">
    <global-toolbar
      title="store-categories"
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
                :src="item[config.imgType].path"
                :alt="item[config.imgType].description"
                @click="handleImgPreview(item[config.imgType].path)"
            /></v-avatar>
          </td>

          <td>
            <v-chip class="color-chip" :color="item.color" />
          </td>

          <td>
            <v-btn icon @click="initDialog('update', item)">
              <v-icon medium title="edit">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon medium title="delete" @click="handleDelete(item.slug, index)">
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
          :config="config"
          :dialog="dialog"
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
import indexMixin from "@/mixins/indexMixin";

// TODO add pagination
export default {
  name: "Categories",

  components: {
    action: () => import("./components/action")
  },

  mixins: [indexMixin],

  data() {
    return {
      headerValues: ["name", "icon", "color", "actions"],
      model: {
        name: "",
        color: "",
        icon: null
      },
      config: {
        idType: "slug",
        modelName: "store-categories",
        imgType: "icon"
      }
    };
  }
};
</script>
