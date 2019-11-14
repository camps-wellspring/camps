<template>
  <section class="projects">
    <global-toolbar
      title="projects"
      action-button
      action-button-text="create"
      @ButtonClicked="$router.push({ name: 'ProjectCreate' })"
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

          <td>{{ item.short_description ? item.short_description : item.description }}</td>

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

          <td class="text-center">
            <toggle-service
              :is-edit="true"
              :model-name="config.modelName"
              :model-id="item.id"
              field="available"
              v-model="item.available"
              :validate="true"
            />
          </td>

          <td>
            <v-btn icon :to="{ name: 'ProjectEdit' }" append>
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
          :config="config"
          :action-type="actionType"
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
  name: "Projects",

  components: {
    action: () => import("./action")
  },

  mixins: [indexMixin],

  data() {
    return {
      headerValues: ["name", "photo", "description", "visible", "available", "actions"],
      model: {
        name: "",
        description: "",
        short_description: "",
        main_media: null
      },
      config: {
        modelName: "projects",
        imgType: "main_media",
        idType: "slug"
      }
    };
  }
};
</script>
