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
                <span>{{ $t("title.image_rqeuired") }}</span>
                <new-image-upload
                  :resetToggle="resetToggle"
                  class="file-upload__image"
                  @fileSelected="uploadPhoto"
                  :imgUrl="form.main_image && form.main_image.path"
                  :imgId="form.main_image && Number(form.main_image.id)"
                  :maxSize="imageSize"
                  @ImageUpdated="ImageUpdated"
              /></v-col>
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
                <form-group name="url">
                  <template slot-scope="{ attrs, listeners }">
                    <v-text-field
                      outlined
                      v-bind="attrs"
                      v-on="listeners"
                      v-model="form.url"
                    ></v-text-field>
                  </template>
                </form-group>
                <small> {{ $t("label.event_date") }}</small>
                <form-group name="date" :attribute="`fields.date`">
                  <template slot-scope="{ attrs, listeners }">
                    <date-time-picker
                      :listeners="listeners"
                      v-model.trim="form.date"
                      :date-time="form.date"
                      :textFieldProps="{ ...attrs, outlined: true }"
                      :label="$t('fields.date')"
                      timeFormat="HH:mm:ss"
                      :allowedDates="allowedDates"
                      :isEdit="isEdit"
                    ></date-time-picker>
                  </template>
                </form-group>

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
                    <v-col cols="3" v-if="SpeakerField">
                      <v-btn
                        @click="addSpeacker"
                        height="55"
                        large
                        class="primary"
                        >{{ $t("button.add_speaker") }}</v-btn
                      >
                    </v-col>
                  </transition>

                  <v-col class="ma-0" cols="12" v-if="speakersList.length > 0">
                    <section class="speakers-wrapper">
                      <v-chip
                        class="mx-2"
                        v-for="(speaker, index) in speakersList"
                        :key="index"
                        close
                        @click:close="handleDeleteSpeacker(index)"
                        >{{ speaker }}</v-chip
                      >
                    </section>
                  </v-col>
                </v-row>
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

              <v-col>
                <v-btn
                  :loading="btnLoading"
                  type="submit"
                  class="primary"
                  :disabled="$v.form.$invalid || requiredFields"
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
import { StoreData, ShowData, UpdateData } from "../../helpers/apiMethods";
export default {
  name: "Events",
  components: {
    GenericDialog: () => import("@/components/GenericDialog"),
    DateTimePicker: () => import("@/components/DateTimePicker")
  },
  data() {
    return {
      headers: ["image", "serial", "name", "date", "configs"],
      btnLoading: false,
      isEdit: true,
      locale: cookies.get("language") || "en",
      form: {
        name: "",
        description: "",
        date: "",
        main_image: "",
        address: "",
        speakers: "",
        url: ""
      },
      speakersList: [],
      imageSize: 1.24,
      resetToggle: false,
      imageOverlay: false,
      menu: false,
      eventIndex: ""
    };
  },
  methods: {
    ImageUpdated() {
      this.$refs.table_ref.handleGetItems();
    },
    fireLocaleChange(locale) {
      this.locale = locale;
      this.handleShowData(this.form.slug, locale);
    },
    async handleShowData(slug, locale) {
      const res = await ShowData({ reqName: "events", id: slug, locale });
      const { event } = res.data;
      const {
        name,
        description,
        url,
        speakers,
        main_image,
        address,
        event_date
      } = event;
      this.form = {
        name,
        description,
        url,
        main_image,
        date: this.$moment(event_date.date).format("YYYY-MM-DD HH:mm:ss"),
        address,
        slug: event.slug
      };
      this.speakersList = speakers;
    },
    clearData() {
      this.$v.$reset();
      this.isEdit = true;
      this.resetToggle = true;
      this.form = {};
      this.speakersList = [];
    },
    async createEvent(data) {
      try {
        const res = await StoreData({ reqName: "events", data });
        const { event } = res.data;
        this.$refs.table_ref.items.push(event);

        this.clearData();
        this.$refs.dialog_ref.toggleDialog();
      } catch (error) {
        console.log(error);
      } finally {
        this.btnLoading = false;
      }
    },
    async editEvent(reqData, slug) {
      try {
        const res = await UpdateData({
          reqName: "events",
          data: reqData,
          id: slug
        });

        const { event } = res.data;
        this.onDialogClose();

        this.$refs.table_ref.handleUpdateItems(event, this.eventIndex);
        this.$refs.dialog_ref.toggleDialog();
      } catch (error) {
        console.log(error);
      } finally {
        this.btnLoading = false;
      }
    },
    handleSubmit() {
      const dateFormat = "YYYY-MM-DD HH:mm:ss";
      this.btnLoading = true;
      const formData = new FormData();
      delete this.form.speakers;
      this.form.date = this.$moment(this.form.date).format(dateFormat);
      if (this.isEdit) {
        delete this.form.main_image;
      }

      formData.append("date", this.form.date);

      Object.keys(this.form).forEach(key =>
        formData.append(key, this.form[key])
      );
      this.speakersList.length > 0 &&
        this.speakersList.forEach(speaker =>
          formData.append("speakers[]", speaker)
        );

      if (!this.isEdit) {
        // in case create
        this.createEvent(formData);
      } else {
        // in case edit
        formData.append("locale", this.locale);
        formData.append("_method", "put");
        this.editEvent(formData, this.form.slug);
      }
    },
    allowedDates(value) {
      const previesDate = new Date(value);
      const currentDate = Date.now();
      return previesDate > currentDate;
    },
    handleDeleteSpeacker(index) {
      this.$delete(this.speakersList, index);
    },
    addSpeacker() {
      this.speakersList.push(this.form.speakers);
      this.form.speakers = "";
      this.$v.form.$reset();
    },
    uploadPhoto(file) {
      this.form.main_image = file.file;
    },
    onDialogClose() {
      this.clearData();
    },
    handleOpenDialog() {
      this.$refs.dialog_ref.toggleDialog();
      this.resetToggle = false;
      this.isEdit = false;
    },
    showImagePreview(image) {
      if (image) {
        this.currentPreviewImage = image.path;
        this.imageOverlay = true;
      }
    },
    handleEdit({ slug }, index) {
      this.eventIndex = index;
      this.$refs.dialog_ref.toggleDialog();
      this.resetToggle = false;
      this.isEdit = true;
      this.handleShowData(slug);
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
    requiredFields() {
      if (this.form.main_image === "" && this.form.date === "") {
        return true;
      } else {
        return false;
      }
    },
    SpeakerField() {
      if (
        this.form.speakers &&
        this.form.speakers !== "" &&
        !this.$v.form.speakers.$invalid
      ) {
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
