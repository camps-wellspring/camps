<template>
  <main>
    <!-- Toolbar -->
    <global-toolbar
      title="sub_services"
      :actionButton="true"
      @ButtonClicked="showSubServiceDialog = true"
    />
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
            <!-- {{ item.short_description | truncate }} -->
            <read-more
              class="read-more"
              :text="item.short_description"
              :max-chars="20"
              less-str="read less"
            />
          </td>
          <td class="toggle-adjust">
            <toggle-service
              :is-edit="true"
              model-name="sub_service"
              :model-id="item.id"
              field="visible"
              v-model="item.visible"
              :validate="true"
            />
          </td>
          <td>
            <v-icon
              class="edit"
              small
              :title="$t('label.edit')"
              @click="handleEdit(item, index)"
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
    <div class="text-xs-center pt-2">
      <v-pagination
        v-if="subServices.length > 0 && pagination.last_page > 1"
        v-model="pagination.current_page"
        :length="pagination.last_page"
        :total-visible="10"
        @input="handlePagination"
      ></v-pagination>
    </div>
    <!-- pagination -->

    <!-- Dialog -->
    <v-dialog v-model="showSubServiceDialog" max-width="700px">
      <v-card>
        <v-card-title>{{
          editMode
            ? this.$t("label.edit_sub_service")
            : this.$t("label.create_sub_service")
        }}</v-card-title>
        <v-divider></v-divider>

        <v-card-text class="py-3">
          <!-- Locale -->
          <v-row v-if="editMode" justify="center">
            <v-col cols="6">
              <locale-select @change="fireLocaleChange" />
            </v-col>
          </v-row>
          <!-- Locale -->

          <!-- Form -->
          <v-form v-if="showSubServiceDialog">
            <form-wrapper :validator="$v.subService">
              <v-row>
                <v-col md="6" cols="12">
                  <form-group name="name">
                    <template slot-scope="{ attrs }">
                      <v-text-field
                        :label="$t('label.name')"
                        v-model="subService.name"
                        v-bind="attrs"
                        outlined
                        @blur="$v.subService.name.$touch()"
                      >
                      </v-text-field>
                    </template>
                  </form-group>
                </v-col>

                <v-col md="6" cols="12">
                  <new-image-upload
                    class="file-upload__image"
                    :imgUrl="subService.icon ? subService.icon.path : ''"
                    @fileSelected="handleUploadIcon"
                  />
                </v-col>

                <v-col cols="12">
                  <form-group name="short_description">
                    <template slot-scope="{ attrs }">
                      <v-textarea
                        :label="$t('label.short_description')"
                        v-model="subService.short_description"
                        v-bind="attrs"
                        :rows="5"
                        outlined
                        @blur="$v.subService.short_description.$touch()"
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

        <v-divider class="mx-4"></v-divider>
        <v-card-actions class="py-4 mx-2">
          <v-spacer></v-spacer>

          <v-btn color="secondary" @click="closeSubServiceDialog">{{
            this.$t("button.cancel")
          }}</v-btn>
          <v-btn
            color="primary"
            :loading="loading.save"
            :disabled="$v.$invalid || !subService.icon"
            @click="save"
            >{{ this.$t("button.save") }}</v-btn
          >
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import {
  IndexData,
  ShowData,
  StoreData,
  UpdateData,
  UpdateMedia,
  DeleteData
} from "@/helpers/apiMethods";
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
      currentImageId: null,
      editMode: false,

      showSubServiceDialog: false,
      locale: Cookies.get("language"),
      loading: {
        save: false,
        media: false,
        main: false
      },

      imageOverlay: false,
      currentPreviewImage: ""
    };
  },
  mounted() {
    this.createTableHeaders();
    // this.getSubServices();
  },
  watch: {
    $route: {
      handler(route) {
        this.queries = {
          ...route.query
        };
        this.getSubServices();
      },
      immediate: true
    }
  },
  methods: {
    createTableHeaders() {
      const headersList = [
        "icon",
        "name",
        "description",
        "visibility",
        "actions"
      ];
      this.headers = TableHeaders(headersList);
    },
    getSubServices() {
      IndexData({ reqName: `sub-services?service_id=${this.serviceId}` })
        .then(res => {
          const { data, meta } = res.data;
          this.subServices = data;
          this.pagination = meta;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleUploadIcon(photoFile) {
      this.subService.icon = photoFile.file;
    },
    showImagePreview(image) {
      if (image) {
        this.currentPreviewImage = image.path;
        this.imageOverlay = true;
      }
    },
    handleEdit({ slug }, index) {
      this.currentSubServiceSlug = slug;
      this.currentSubServiceIndex = index;
      this.editMode = true;
      this.showSubServiceDialog = true;

      this.getSubServiceData();
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

          this.currentImageId = this.subService.icon.id;
        })
        .catch(err => {
          console.log(err);
        });
    },

    save() {
      this.loading.save = true;

      // handle requests
      if (!this.editMode) {
        this.StoreSubService();
      } else {
        this.UpdateSubService();
      }
    },
    StoreSubService() {
      // set the request data
      let formData = new FormData();
      Object.keys(this.subService).forEach(key => {
        formData.append(key, this.subService[key]);
      });

      // Create Sub Serveice
      StoreData({
        reqName: "sub-services",
        data: formData
      })
        .then(res => {
          this.loading.save = false;
          this.subServices.push(res.data.sub_service);
          this.closeSubServiceDialog();
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },
    UpdateSubService() {
      // Edit Sub serveice
      let formData = new FormData();
      Object.keys(this.subService).forEach(key => {
        if (key == "icon") {
          if (this.subService[key] instanceof File) {
            this.UpdateMainPhoto(this.subService[key]);
          }
        } else {
          formData.append(key, this.subService[key]);
        }
      });

      // standards
      formData.append("_method", "PUT");
      formData.append("locale", this.locale);

      this.loading.main = true;
      UpdateData({
        reqName: "sub-services",
        id: this.currentSubServiceSlug,
        data: formData
      })
        .then(res => {
          this.subServices.splice(
            this.currentSubServiceIndex,
            1,
            res.data.sub_service
          );

          if (!this.loading.media) {
            this.loading.save = false;
            this.getSubServices();
            this.closeSubServiceDialog();
          }
          this.loading.main = false;
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },
    UpdateMainPhoto(image) {
      let formData = new FormData();
      formData.append("file", image);
      formData.append("_method", "PUT");
      formData.append("locale", this.locale);

      this.loading.media = true;
      UpdateMedia({ id: this.currentImageId, data: formData })
        .then(() => {
          if (!this.loading.main) {
            this.loading.save = false;
            this.getSubServices();
            this.closeSubServiceDialog();
          }
          this.loading.media = false;
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
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
    },

    closeSubServiceDialog() {
      this.showSubServiceDialog = false;
      this.resetSubService();
    },
    resetSubService() {
      this.$v.$reset();
      this.subService = {
        service_id: this.$route.params.id,
        name: "",
        icon: null,
        short_description: ""
      };

      this.locale = Cookies.get("language");
      this.currentSubServiceSlug = null;
      this.currentSubServiceIndex = null;
      this.editMode = false;
    },
    handlePagination(value) {
      this.queries.page = value;
      this.$router.push({ query: this.queries });
    }
  },
  validations() {
    return {
      subService: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(20)
        },
        short_description: {
          required,
          minLength: minLength(3)
        }
      }
    };
  }
};
</script>
