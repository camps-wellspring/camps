<template>
  <main>
    <!-- Toolbar -->
    <!-- <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.services") }}</v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-btn color="primary" to="handleService/new">
        {{ $t("button.create") }}
      </v-btn>
    </v-toolbar> -->
    <global-toolbar title="services" :actionButton="true" @ButtonClicked="createService" />
    <!-- Toolbar -->

    <!-- Table -->
    <v-data-table :headers="headers" :items="services" hide-default-footer :loading="tableLoading">
      <template v-slot:item="{ item, index }">
        <tr>
          <td>
            <v-avatar size="40" color="grey">
              <img
                v-if="item.main_image"
                :src="item.main_image.path"
                class="hover-pointer"
                @click="showImagePreview(item.main_image)"
                :title="$t('label.preview')"
                :alt="$t('label.service_photo')"
              />
              <img
                v-else
                src="@/assets/imgs/user.png"
                :title="$t('label.no_photo')"
                :alt="$t('label.service_photo')"
              />
            </v-avatar>
          </td>
          <td>{{ item.name }}</td>
          <td :title="item.short_description">
            <!-- {{ item.short_description | truncate }} -->
            <read-more
              class="read-more"
              :text="item.short_description"
              :max-chars="20"
              less-str="read less"
            />
          </td>
          <td>{{ item.priority }}</td>
          <td class="toggle-adjust">
            <toggle-service
              :is-edit="true"
              model-name="service"
              :model-id="item.id"
              field="visible"
              v-model="item.visible"
              :validate="true"
            />
          </td>
          <td>
            <v-btn
              :title="$t('label.features')"
              @click="handleFeatures(item)"
              :color="item.features.length > 0 ? 'primary' : 'red'"
              icon
              fab
              small
            >
              <v-icon class="edit">mdi-star-circle-outline</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn
              :title="$t('label.sub_services')"
              @click="handleSubs(item)"
              :color="item.sub_services.length > 0 ? 'primary' : 'red'"
              icon
              fab
              small
              outlined
            >
              <v-icon class="edit">mdi-file-tree</v-icon>
            </v-btn>
          </td>
          <td>
            <!-- <v-icon
              class="edit"
              small
              :title="$t('label.sub_services')"
              @click="handleSubs(item)"
              >mdi-plus</v-icon
            > -->
            <v-icon class="edit" small :title="$t('label.edit')" @click="handleEdit(item)"
              >mdi-pencil</v-icon
            >
            <v-icon
              class="delete"
              :title="$t('label.delete')"
              small
              @click="handleDelete(item, index)"
              >mdi-delete</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- Table -->

    <!-- pagination -->
    <!-- <div class="text-xs-center pt-2">
      <v-pagination
        v-if="services.length > 0 && pagination.last_page > 1"
        v-model="pagination.current_page"
        :length="pagination.last_page"
        :total-visible="10"
        @input="handlePagination"
      ></v-pagination>
    </div> -->
    <!-- pagination -->

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
        v-if="showFeaturesDialog"
        :FeaturedItemId="currentFeaturedItemId"
        @closeFeatures="closeFeatures"
      ></global-features>
    </v-dialog>
    <!-- Dialog -->
  </main>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";
import GlobalFeatures from "@/components/GlobalFeatures";

export default {
  name: "services",

  data() {
    return {
      headers: [],
      services: [],
      tableLoading: true,
      showFeaturesDialog: false,
      currentFeaturedItemId: null,

      imageOverlay: false,
      currentPreviewImage: "",

      pagination: {},
      queries: {}
    };
  },
  mounted() {
    this.createTableHeaders();
    this.getServices();
  },
  components: {
    GlobalFeatures
  },
  //   watch: {
  //     $route: {
  //       handler(route) {
  //         this.queries = {
  //           ...route.query
  //         };
  //         this.getServices();
  //       },
  //       immediate: true
  //     }
  //   },
  methods: {
    createTableHeaders() {
      const headersList = [
        "image",
        "name",
        "description",
        "priority",
        "visibility",
        "features",
        "sub_services",
        "actions"
      ];
      this.headers = TableHeaders(headersList);
    },
    createService() {
      this.$router.push({ name: "HandleService", params: { slug: "new" } });
    },
    getServices() {
      IndexData({ reqName: "services" })
        .then(res => {
          const { data } = res.data;
          this.services = data;
          //   this.pagination = meta;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    showImagePreview(image) {
      if (image) {
        this.currentPreviewImage = image.path;
        this.imageOverlay = true;
      }
    },
    handleFeatures({ id }) {
      this.showFeaturesDialog = true;
      this.currentFeaturedItemId = id;
    },
    handleSubs({ id }) {
      this.$router.push({ name: "SubServices", params: { id: id } });
    },
    handleEdit({ slug }) {
      this.$router.push({ name: "HandleService", params: { slug: slug } });
    },
    handleDelete({ slug }, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: "services", id: slug })
            .then(() => {
              this.services.splice(index, 1);
            })
            .catch(err => console.log(err));
        }
      });
    },
    handlePagination(value) {
      this.queries.page = value;
      this.$router.push({ query: this.queries });
    },
    closeFeatures() {
      this.showFeaturesDialog = false;
    }
  }
};
</script>
