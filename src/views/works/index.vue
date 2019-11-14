<template>
  <main>
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.works") }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$router.push({ name: 'create_work' })">{{
        $t("button.create")
      }}</v-btn>
    </v-toolbar>
    <!-- table -->
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      :items-per-page="20"
      :loading="tableLoading"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>
            <v-avatar size="40" style=" cursor: pointer;">
              <v-img
                :title="$t('label.preview')"
                @click="showImagePreview(item.logo)"
                aspect-ratio="1"
                :src="item.logo ? item.logo.path : '@/assets/imgs/user.jpg'"
              ></v-img>
            </v-avatar>
          </td>
          <td>{{ item.name }}</td>
          <td class="toggle-adjust">
            <toggle-service
              :is-edit="true"
              model-name="works"
              :model-id="item.id"
              field="visible"
              v-model="item.visible"
              :validate="true"
            />
          </td>
          <td>{{ item.priority }}</td>
          <td>{{ item.description | truncate }}</td>
          <td>
            <v-btn
              :title="$t('label.features')"
              @click="handleFeatures(item)"
              :color="item.features ? 'primary' : 'red'"
              icon
              fab
              small
            >
              <v-icon class="edit">mdi-star-circle-outline</v-icon>
            </v-btn>
          </td>
          <td>
            <v-icon medium title="edit" @click="handleEdit(item, index)">mdi-pencil</v-icon>
            <v-icon medium title="delete" @click="handleDelete(item, index)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- Image Preview -->
    <global-image-preview
      :showDialog="imageOverlay"
      :imagePath="currentPreviewImage"
      @closePreview="imageOverlay = false"
    />
    <!-- Image Preview -->
    <!-- Dialog -->
    <v-dialog v-model="showFeaturesDialog" max-width="700px">
      <global-features
        FeaturedItemType="work"
        v-if="showFeaturesDialog"
        :FeaturedItemId="currentFeaturedItemId"
        @closeFeatures="closeFeatures"
      ></global-features>
    </v-dialog>
    <!-- Dialog -->
    <!-- table -->
    <div class="text-xs-center mt-4">
      <v-pagination
        v-if="items.length > 0 && pagination.last_page > 1"
        v-model="pagination.current_page"
        :length="pagination.last_page"
        :total-visible="10"
        @input="handlePagination"
      ></v-pagination>
    </div>
  </main>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";

import { isEqual } from "lodash";
export default {
  name: "Works",
  components: {
    GlobalFeatures: () => import("@/components/GlobalFeatures")
  },

  data() {
    return {
      headers: [],
      items: [],
      expanded: [],
      pagination: {},
      singleExpand: false,
      showFeaturesDialog: false,
      tableLoading: true,
      queries: {},
      imageOverlay: false,
      currentPreviewImage: ""
    };
  },
  mounted() {
    this.createTableHeaders();
  },
  methods: {
    showImagePreview(image) {
      if (image) {
        this.currentPreviewImage = image.path;
        this.imageOverlay = true;
      }
    },
    closeFeatures() {
      this.showFeaturesDialog = false;
    },
    handleFeatures({ id }) {
      this.showFeaturesDialog = true;
      this.currentFeaturedItemId = id;
    },
    handlePagination(page) {
      this.queries = { ...this.queries, page };
      if (!isEqual(this.queries, this.$route.query)) {
        this.$router.push({ query: this.queries });
      }
    },
    handleEdit({ slug }, index) {
      console.log(index);
      this.$router.push({ name: "edit_work", params: { slug } });
    },
    handleDelete({ slug }, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: "works", id: slug })
            .then(res => {
              console.log(res);
              this.$delete(this.items, index);
            })
            .catch(err => console.log(err));
        }
      });
    },
    handleExpand(props) {
      props.isExpanded = !props.isExpanded;
      console.log(props);
    },
    handleGetWorks(query) {
      IndexData({ reqName: "works", query })
        .then(res => {
          const { data, meta } = res.data;
          this.items = data;
          this.pagination = meta;
          console.log(this.items);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    createTableHeaders() {
      const headersList = [
        "logo",
        "name",
        "visible",
        "priority",
        "description",
        "features",
        "configs"
      ];
      this.headers = TableHeaders(headersList);
    }
  },
  watch: {
    $route: {
      handler(route) {
        const { query } = route;
        this.queries = query;
        this.handleGetWorks(query);
      },
      immediate: true
    }
  }
};
</script>
