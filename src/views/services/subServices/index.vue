<template>
  <main>
    <!-- Toolbar -->
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.sub_services") }}</v-toolbar-title>
    </v-toolbar>
    <!-- Toolbar -->

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="subServices"
      hide-default-footer
      :loading="tableLoading"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>
            <v-avatar size="40" color="grey">
              <img
                v-if="item.icon"
                :src="item.icon.path"
                class="hover-pointer"
                @click="showImagePreview(item.icon)"
                :title="$t('label.preview')"
                :alt="$t('label.sub_service_icon')"
              />
              <img
                v-else
                src="@/assets/imgs/user.png"
                :title="$t('label.no_photo')"
                :alt="$t('label.sub_service_icon')"
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
              :title="$t('label.sub_services')"
              @click="handleSubs(item)"
              >mdi-plus</v-icon
            >
            <v-icon
              class="edit"
              small
              :title="$t('label.edit')"
              @click="handleEdit(item, index)"
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

    <!-- Dialog -->
    <v-dialog v-model="showSubServiceDialog" max-width="700px">
      <v-card>
        <v-card-title>Select Country</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 700px;">
          <!-- Locale -->
          <v-row v-if="editMode" justify="center">
            <v-col cols="6">
              <locale-select @change="fireLocaleChange" />
            </v-col>
          </v-row>
          <!-- Locale -->

          <!-- Form -->
          <v-form>
            <form-wrapper :validator="$v.service">
              <v-row>
                <v-col md="4" cols="12">
                  <form-group name="name">
                    <template slot-scope="{ attrs }">
                      <v-text-field
                        :label="$t('label.name')"
                        v-model="service.name"
                        v-bind="attrs"
                        outlined
                        @blur="$v.service.name.$touch()"
                      >
                      </v-text-field>
                    </template>
                  </form-group>
                </v-col>

                <v-col md="4" cols="12">
                  <form-group name="priority">
                    <template slot-scope="{ attrs }">
                      <v-text-field
                        :label="$t('label.priority')"
                        v-model="service.priority"
                        v-bind="attrs"
                        type="number"
                        outlined
                        @blur="$v.service.priority.$touch()"
                      >
                      </v-text-field>
                    </template>
                  </form-group>
                </v-col>

                <v-col md="4" cols="12">
                  <new-image-upload
                    class="file-upload__image"
                    :imgUrl="service.main_image ? service.main_image.path : ''"
                    @fileSelected="handleUploadMainImage"
                  />
                </v-col>

                <v-col md="6" cols="12">
                  <form-group name="short_description">
                    <template slot-scope="{ attrs }">
                      <v-textarea
                        :label="$t('label.short_description')"
                        v-model="service.short_description"
                        v-bind="attrs"
                        :rows="5"
                        outlined
                        @blur="$v.service.short_description.$touch()"
                      >
                      </v-textarea>
                    </template>
                  </form-group>
                </v-col>

                <v-col md="6" cols="12">
                  <form-group name="description">
                    <template slot-scope="{ attrs }">
                      <v-textarea
                        :label="$t('label.description')"
                        v-model="service.description"
                        v-bind="attrs"
                        :rows="5"
                        outlined
                        @blur="$v.service.description.$touch()"
                      >
                      </v-textarea>
                    </template>
                  </form-group>
                </v-col>
              </v-row>
            </form-wrapper>
          </v-form>
          <!-- Form -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="secondary" @click="closeSubServiceDialog">Close</v-btn>
          <v-btn color="primary" @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog -->

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
import { IndexData, ShowData, DeleteData } from "@/helpers/apiMethods";
import Cookies from "js-cookie";

export default {
  name: "sub_services",

  data() {
    return {
      headers: [],
      serviceId: this.$route.params.id,
      subServices: [],
      tableLoading: true,

      subService: {
        service_id: this.$route.params.id,
        name: "",
        icon: null,
        short_description: ""
      },

      currentSubServiceSlug: null,
      currentSubServiceIndex: null,
      editMode: false,

      showSubServiceDialog: false,
      locale: Cookies.get("language"),
      loading: {
        save: false
      },

      imageOverlay: false,
      currentPreviewImage: ""
    };
  },
  mounted() {
    this.createTableHeaders();
    this.getSubServices();
  },
  methods: {
    createTableHeaders() {
      const headersList = ["icon", "name", "description", "actions"];
      this.headers = TableHeaders(headersList);
    },
    getSubServices() {
      IndexData({ reqName: `sub-services?service_id=${this.serviceId}` })
        .then(res => {
          const { data } = res.data;
          this.subServices = data;
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
    handleSubs({ id }) {
      this.$router.push({ name: "SubServices", params: { id: id } });
    },
    handleEdit({ slug }, index) {
      this.currentSubServiceSlug = slug;
      this.currentSubServiceIndex = index;
      this.editMode = true;
    },
    fireLocaleChange(locale) {
      this.locale = locale;
      this.getSubServiceData();
    },
    getSubServiceData() {
      ShowData({
        reqName: "sub-services",
        id: this.currentSubServiceSlug,
        locale: this.locale
      })
        .then(res => {
          const { sub_service } = res.data;
          Object.keys(this.subService).forEach(key => {
            this.subService[key] = sub_service[key];
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeSubServiceDialog() {
      this.showSubServiceDialog = false;
      this.resetSubService();
    },
    resetSubService() {
      this.subService = {
        service_id: this.$route.params.id,
        name: "",
        icon: null,
        short_description: ""
      };

      this.currentSubServiceSlug = null;
      this.currentSubServiceIndex = null;
      this.editMode = false;
    },
    handleDelete({ slug }, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: "sub-services", id: slug })
            .then(() => {
              this.subServices.splice(index, 1);
            })
            .catch(err => console.log(err));
        }
      });
    }
  }
};
</script>
