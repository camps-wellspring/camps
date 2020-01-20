<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>{{ $t("heading.events") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="handleOpenDialog" class="primary">{{
        $t("button.create")
      }}</v-btn>
    </v-toolbar>
    <!-- table -->
    <WrappingTable ref="table_ref" :headersName="headers" pathName="events">
      <template slot-scope="{ item, index }">
        <td>
          <v-avatar size="50">
            <v-img
              @click="showImagePreview(item.main_image)"
              class="hover-pointer"
              aspect-ratio="1"
              :src="item.main_image && item.main_image.path"
            ></v-img>
          </v-avatar>
        </td>
        <td class="pa-3">
          {{ item.serial }}
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.event_date.date }}</td>
        <td>
          <v-icon small title="edit" @click="handleEdit(item, index)">
            mdi-pencil</v-icon
          >
          <v-icon small title="delete" @click="handleDelete(item, index)">
            mdi-delete</v-icon
          >
        </td>
      </template>
    </WrappingTable>
    <!-- table -->
    <!-- dialog -->
    <GenericDialog ref="dialog_ref" @dialog_closed="onDialogClose">
      <template #card-title>{{ dialogTitle }}</template>
      <template #card-text>
        <formWrapper :validator="$v.form">
          <v-form @submit.prevent="handleSubmit">
            <v-row>
              <v-col cols="12" v-if="isEdit">
                <locale-select @change="fireLocaleChange" />
              </v-col>
              <v-col cols="12">
                <form-group name="name">
                  <template slot-scope="{ attrs, listeners }">
                    <v-text-field
                      outlined
                      v-bind="attrs"
                      v-on="listeners"
                      v-model="form.name"
                    ></v-text-field>
                  </template>
                </form-group>
                <form-group name="address">
                  <template slot-scope="{ attrs, listeners }">
                    <v-text-field
                      outlined
                      v-bind="attrs"
                      v-on="listeners"
                      v-model="form.address"
                    ></v-text-field>
                  </template>
                </form-group>
              </v-col>
              <v-col cols="12">
                <form-group name="description" attribute="input.description">
                  <template slot-scope="{ attrs, listeners }">
                    <v-textarea
                      outlined
                      v-bind="attrs"
                      v-on="listeners"
                      v-model="form.description"
                      rows="10"
                      no-resize
                    ></v-textarea>
                  </template>
                </form-group>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="9">
                    <form-group name="speakers">
                      <template slot-scope="{ attrs, listeners }">
                        <v-text-field
                          outlined
                          v-bind="attrs"
                          v-on="listeners"
                          v-model="form.speakers"
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>
                  <transition name="fade" mode="out-in">
                    <v-col cols="3">
                      <v-btn height="55" large class="primary ">{{
                        $t("button.add_speaker")
                      }}</v-btn>
                    </v-col>
                  </transition>

                  <v-col cols="12">
                    <section class="speakers-wrapper">
                      <v-chip
                        v-for="(speaker, index) in speakersList"
                        :key="index"
                        >{{ epeaker }}</v-chip
                      >
                    </section>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" lg="6">
                <span>{{ $t("title.upload_image") }}</span>
                <new-image-upload
                  :resetToggle="resetToggle"
                  class="file-upload__image"
                  @fileSelected="uploadPhoto"
                  :imgUrl="form.main_image && form.main_image.path"
                  :imgId="form.main_image && Number(form.main_image.id)"
                  :maxSize="imageSize"
                />
              </v-col>

              <v-col>
                <v-btn
                  :loading="btnLoading"
                  type="submit"
                  class="primary"
                  :disabled="$v.form.$invalid || photoExist"
                  >{{ $t("button.save") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </formWrapper>
      </template>
    </GenericDialog>
    <!-- dialog -->
    <!-- Image Preview -->
    <global-image-preview
      :showDialog="imageOverlay"
      :imagePath="currentPreviewImage && currentPreviewImage"
      @closePreview="imageOverlay = false"
    />
    <!-- Image Preview -->
  </div>
</template>

<script>
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import cookies from "js-cookie";
// import { StoreData, ShowData, UpdateData } from "@/helpers/apiMethods";
import { maxWords } from "@/utils/validate";
export default {
  name: "Events",
  components: {
    GenericDialog: () => import("@/components/GenericDialog")
  },
  data() {
    return {
      headers: ["image", "serial", "name", "date", "configs"],
      btnLoading: false,
      isEdit: false,
      locale: cookies.get("language") || "en",
      form: {
        name: "",
        description: "",
        date: "",
        main_image: "",
        address: "",
        speakers: [],
        url: ""
      },
      speakersList: [],
      imageSize: 1.24,
      resetToggle: false,
      imageOverlay: false
    };
  },
  methods: {
    uploadPhoto(file) {
      this.form.main_image = file.file;
    },
    onDialogClose() {
      this.$v.$reset();
      this.isEdit = false;
      this.resetToggle = true;
      this.form = Object.keys(this.form).reduce(acc => {
        acc = "";
        return acc;
      }, {});
    },
    handleOpenDialog() {
      this.$refs.dialog_ref.toggleDialog();
      this.resetToggle = false;
    },
    showImagePreview(image) {
      if (image) {
        this.currentPreviewImage = image.path;
        this.imageOverlay = true;
      }
    },
    handleDelete({ slug }, index) {
      this.$refs.table_ref.handleDelete(slug, index);
    }
  },
  computed: {
    dialogTitle() {
      if (!this.isEdit) {
        return this.$t("title.Create_event");
      } else {
        return this.$t("title.edit_event");
      }
    },
    photoExist() {
      if (this.form.main_image === "") {
        return true;
      } else {
        return false;
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100)
      },
      description: {
        required,
        minLength: minLength(3),
        maxWords: maxWords(255)
      },
      date: {
        required
      },
      main_image: {
        required
      },
      url: {
        url
      },
      address: {
        required,
        minLength: minLength(3),
        maxWords: maxWords(500)
      },
      speakers: {
        minLength: minLength(3),
        maxLength: maxLength(150)
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
