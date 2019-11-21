<template>
  <section class="projects">
    <global-toolbar
      title="projects"
      action-button
      action-button-text="create"
      @ButtonClicked="$router.push({ name: 'ProjectCreate' })"
    />
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      disable-pagination
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
            <read-more
              class="read-more"
              :text="item.short_description ? item.short_description : 'No description available'"
              :max-chars="38"
              less-str="read less"
            />
          </td>

          <td>
            <v-btn :title="$t('label.features')" @click="handleFeatures(item.id)" icon fab small>
              <v-icon class="edit">mdi-star-circle-outline</v-icon>
            </v-btn>
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
            <v-btn
              icon
              :to="{ name: 'ProjectEdit', params: { slug: item.slug, actionType: 'edit' } }"
            >
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

    <v-dialog v-model="featureDialog" max-width="700px">
      <global-features
        featured-item-type="project"
        v-if="featureDialog"
        :featured-item-id="featureId"
        @closeFeatures="featureDialog = false"
      />
    </v-dialog>

    <global-image-preview
      :image-path="currImg"
      :show-dialog="imgPreviewDialog"
      @closePreview="closePreview"
    />
  </section>
</template>

<script>
import indexMixin from "@/mixins/indexMixin";

// TODO add pagination & remove "disable-pagination" prop from the table
export default {
  name: "Projects",

  components: {
    GlobalFeatures: () => import("@/components/GlobalFeatures")
  },

  mixins: [indexMixin],

  data() {
    return {
      headerValues: ["name", "photo", "description", "features", "visible", "available", "actions"],
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
      },
      featureDialog: false,
      featureId: null
    };
  },

  methods: {
    handleFeatures(id) {
      this.featureDialog = true;
      this.featureId = id;
    }
  }
};
</script>
