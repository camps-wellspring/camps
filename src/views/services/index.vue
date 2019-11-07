<template>
  <main>
    <!-- Toolbar -->
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.services") }}</v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-btn color="primary" to="handleService/new">
        {{ $t("button.create") }}
      </v-btn>
    </v-toolbar>
    <!-- Toolbar -->

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="services"
      hide-default-footer
      :loading="tableLoading"
    >
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
            {{ item.short_description | truncate }}
          </td>
          <td>
            <v-icon
              class="edit"
              small
              :title="$t('label.add_sub_service')"
              @click="handleAddSub(item, index)"
              >mdi-plus</v-icon
            >
            <v-icon
              class="edit"
              small
              :title="$t('label.edit')"
              @click="handleEdit(item)"
              >mdi-mouse</v-icon
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

    <!-- Image Preview -->
    <global-image-preview
      :showDialog="imageOverlay"
      :imagePath="currentPreviewImage"
      @closePreview="imageOverlay = false"
    />
    <!-- Image Preview -->
  </main>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";

export default {
  name: "services",

  data() {
    return {
      headers: [],
      services: [],
      tableLoading: true,

      imageOverlay: false,
      currentPreviewImage: ""
    };
  },
  mounted() {
    this.createTableHeaders();
    this.getServices();
  },
  methods: {
    createTableHeaders() {
      const headersList = ["image", "name", "description", "actions"];
      this.headers = TableHeaders(headersList);
    },
    getServices() {
      IndexData({ reqName: "services" })
        .then(res => {
          const { data } = res.data;
          this.services = data;
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
    handleAddSub() {},
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
    }
  }
};
</script>
