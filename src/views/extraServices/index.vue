<template>
  <main>
    <!-- Toolbar -->
    <global-toolbar
      title="extra_services"
      :actionButton="true"
      @ButtonClicked="showExtraServiceDialog = true"
    />
    <!-- Toolbar -->

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="extraServices"
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
                :alt="$t('label.extra_service_icon')"
              />
              <img
                v-else
                src="@/assets/imgs/user.png"
                :title="$t('label.no_photo')"
                :alt="$t('label.extra_service_icon')"
              />
            </v-avatar>
          </td>
          <td>{{ item.name }}</td>
          <td class="toggle-adjust">
            <toggle-service
              :is-edit="true"
              model-name="project_available"
              :model-id="item.id"
              field="available"
              v-model="item.is_project_available"
              :validate="true"
            />
          </td>
          <td class="toggle-adjust">
            <toggle-service
              :is-edit="true"
              model-name="service_available"
              :model-id="item.id"
              field="available"
              v-model="item.is_service_available"
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

    <!-- Dialog -->
    <v-dialog v-model="showExtraServiceDialog" max-width="700px">
      <v-card>
        <v-card-title>{{
          editMode
            ? this.$t("label.edit_extra_service")
            : this.$t("label.create_extra_service")
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
          <v-form v-if="showExtraServiceDialog">
            <form-wrapper :validator="$v.extraService">
              <v-row>
                <v-col md="6" cols="12">
                  <form-group name="name">
                    <template slot-scope="{ attrs }">
                      <v-text-field
                        :label="$t('label.name')"
                        v-model="extraService.name"
                        v-bind="attrs"
                        outlined
                        @blur="$v.extraService.name.$touch()"
                      >
                      </v-text-field>
                    </template>
                  </form-group>
                </v-col>

                <v-col md="6" cols="12">
                  <new-image-upload
                    class="file-upload__image"
                    :imgUrl="extraService.icon ? extraService.icon.path : ''"
                    @fileSelected="handleUploadIcon"
                  />
                </v-col>
              </v-row>
            </form-wrapper>
          </v-form>
          <!-- Form -->
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
        <v-card-actions class="py-4 mx-2">
          <v-spacer></v-spacer>

          <v-btn color="secondary" @click="closeExtraServiceDialog">{{
            this.$t("button.cancel")
          }}</v-btn>
          <v-btn
            color="primary"
            :loading="loading.save"
            :disabled="$v.$invalid || !extraService.icon"
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
  name: "extra_services",

  data() {
    return {
      headers: [],
      extraServices: [],
      tableLoading: true,

      extraService: {
        name: "",
        icon: null
      },

      currentExtraServiceId: null,
      currentExtraServiceIndex: null,
      currentImageId: null,
      editMode: false,

      showExtraServiceDialog: false,
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
    this.getExtraServices();
  },
  methods: {
    createTableHeaders() {
      const headersList = [
        "icon",
        "name",
        "project_available",
        "service_available",
        "actions"
      ];
      this.headers = TableHeaders(headersList);
    },
    getExtraServices() {
      IndexData({ reqName: `extra-services` })
        .then(res => {
          const { data } = res.data;
          this.extraServices = data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleUploadIcon(photoFile) {
      this.extraService.icon = photoFile.file;
    },
    showImagePreview(image) {
      if (image) {
        this.currentPreviewImage = image.path;
        this.imageOverlay = true;
      }
    },
    handleEdit({ id }, index) {
      this.currentExtraServiceId = id;
      this.currentExtraServiceIndex = index;
      this.editMode = true;
      this.showExtraServiceDialog = true;

      this.getExtraServiceData();
    },
    fireLocaleChange(locale) {
      this.locale = locale;
      this.getExtraServiceData();
    },
    getExtraServiceData() {
      ShowData({
        reqName: "extra-services",
        id: this.currentExtraServiceId,
        locale: this.locale
      })
        .then(res => {
          const { extra_service } = res.data;
          Object.keys(this.extraService).forEach(key => {
            this.extraService[key] = extra_service[key];
          });

          this.currentImageId = this.extraService.icon.id;
        })
        .catch(err => {
          console.log(err);
        });
    },

    save() {
      this.loading.save = true;

      // handle requests
      if (!this.editMode) {
        this.StoreExtraService();
      } else {
        this.UpdateExtraService();
      }
    },
    StoreExtraService() {
      // set the request data
      let formData = new FormData();
      Object.keys(this.extraService).forEach(key => {
        formData.append(key, this.extraService[key]);
      });

      // Create Extra Serveice
      StoreData({
        reqName: "extra-services",
        data: formData
      })
        .then(res => {
          this.loading.save = false;
          this.extraServices.push(res.data.extra_service);
          this.closeExtraServiceDialog();
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },
    UpdateExtraService() {
      // Edit Sub serveice
      let formData = new FormData();
      Object.keys(this.extraService).forEach(key => {
        if (key == "icon") {
          if (this.extraService[key] instanceof File) {
            this.UpdateMainPhoto(this.extraService[key]);
          }
        } else {
          formData.append(key, this.extraService[key]);
        }
      });

      // standards
      formData.append("_method", "PUT");
      formData.append("locale", this.locale);

      this.loading.main = true;
      UpdateData({
        reqName: "extra-services",
        id: this.currentExtraServiceId,
        data: formData
      })
        .then(res => {
          this.extraServices.splice(
            this.currentExtraServiceIndex,
            1,
            res.data.extra_service
          );

          //   this.loading.save = false;
          //   this.closeExtraServiceDialog();
          if (!this.loading.media) {
            this.loading.save = false;
            this.getExtraServices();
            this.closeExtraServiceDialog();
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
            this.getExtraServices();
            this.closeExtraServiceDialog();
          }
          this.loading.media = false;
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },

    handleDelete({ id }, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: "extra-services", id: id })
            .then(() => {
              this.extraServices.splice(index, 1);
            })
            .catch(err => console.log(err));
        }
      });
    },

    closeExtraServiceDialog() {
      this.showExtraServiceDialog = false;
      this.resetExtraService();
    },
    resetExtraService() {
      this.$v.$reset();
      this.extraService = {
        name: "",
        icon: null
      };

      this.locale = Cookies.get("language");
      this.currentExtraServiceId = null;
      this.currentExtraServiceIndex = null;
      this.editMode = false;
    }
  },
  validations() {
    return {
      extraService: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(30)
        }
      }
    };
  }
};
</script>
