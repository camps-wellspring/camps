<template>
  <section class="technologies">
    <global-toolbar
      title="technologies"
      action-button
      action-button-text="create"
      @ButtonClicked="initDialog('create')"
    />
    <v-data-table
      :headers="headers"
      :items="items"
      disable-pagination
      hide-default-footer
      :loading="loading.table"
    >
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

          <td class="text-center">
            <toggle-service
              :is-edit="true"
              :model-name="config.modelName"
              :model-id="item.id"
              field="visible"
              v-model="item.visible"
              :validate="true"
            />
          </td>

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

export default {
  name: "Platforms",

  components: {
    action: () => import("./components/action")
  },

  mixins: [indexMixin],

  data() {
    return {
      headerValues: ["name", "icon", "color", "visible", "actions"],
      model: {
        name: "",
        color: "",
        icon: null
      },
      config: {
        modelName: "platforms",
        imgType: "icon"
      }
    };
  }
};
</script>
