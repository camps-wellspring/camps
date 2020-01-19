<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>{{ $t("heading.books") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="handleOpenDialog" class="primary">{{
        $t("button.create")
      }}</v-btn>
    </v-toolbar>
    <!-- table -->
    <WrappingTable ref="table_ref" :headersName="headers" pathName="books">
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
          <a :href="item.book && item.book.path" title="book" target="_blank">
            <v-avatar size="50">
              <v-img
                class="hover-pointer"
                aspect-ratio="1"
                :src="require('@/assets/imgs/pdf-icon.png')"
              ></v-img>
            </v-avatar>
          </a>
        </td>
        <td>{{ item.name }}</td>
        <td :title="item.short_description">
          {{ item.short_description | truncate }}
        </td>
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
              </v-col>
              <v-col cols="12">
                <form-group
                  name="short_description"
                  attribute="input.short_description"
                >
                  <template slot-scope="{ attrs, listeners }">
                    <v-textarea
                      outlined
                      v-bind="attrs"
                      v-on="listeners"
                      v-model="form.short_description"
                      rows="10"
                      no-resize
                    ></v-textarea>
                  </template>
                </form-group>
              </v-col>
              <v-col cols="12" lg="6">
                <span>{{ $t("title.upload_book_cover") }}</span>

                <new-image-upload
                  :resetToggle="resetToggle"
                  class="file-upload__image"
                  @fileSelected="uploadPhoto"
                  @ImageUpdated="ImageUpdated"
                  :imgUrl="form.main_image && form.main_image.path"
                  :imgId="form.main_image && Number(form.main_image.id)"
                  :maxSize="imageSize"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <span>{{ $t("title.upload_your_book") }}</span>
                <uploadFilePdf
                  @FileUpdated="FileUpdated"
                  :maxSize="pdfSize"
                  :fileUrl="form.book && form.book.path"
                  :fileId="form.book && form.book.id"
                  :resetToggle="resetToggle"
                  class="file-upload__image"
                  @file_selected="UploadFile"
                />
              </v-col>
              <v-col>
                <v-btn
                  :loading="btnLoading"
                  type="submit"
                  class="primary"
                  :disabled="$v.form.$invalid || photoAndFilesExist"
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import cookies from "js-cookie";
import { StoreData, ShowData, UpdateData } from "@/helpers/apiMethods";
export default {
  name: "Books",
  components: {
    GenericDialog: () => import("@/components/GenericDialog"),
    uploadFilePdf: () => import("@/components/uploadFilePdf")
  },
  data() {
    return {
      headers: ["image", "book", "name", "description", "configs"],
      imageOverlay: false,
      isEdit: false,
      form: {
        name: "",
        short_description: "",
        main_image: "",
        book_file: ""
      },
      book: {},
      imageSize: 3,
      pdfSize: 20,
      btnLoading: false,
      resetToggle: false,
      locale: cookies.get("language") || "en",
      bookIndex: null
    };
  },
  computed: {
    dialogTitle() {
      if (!this.isEdit) {
        return this.$t("title.Create_book");
      } else {
        return this.$t("title.edit_book");
      }
    },
    photoAndFilesExist() {
      if (this.form.main_image === "" || this.form.book_file === "") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ImageUpdated() {
      this.$refs.table_ref.handleGetItems();
    },
    FileUpdated() {
      this.$refs.table_ref.handleGetItems();
    },
    fireLocaleChange(locale) {
      this.locale = locale;
      this.handleShowData(this.form.slug, locale);
    },
    handleSubmit() {
      const formData = new FormData();
      this.btnLoading = true;
      if (this.isEdit) {
        delete this.form.main_image;
        delete this.form.book_file;
        delete this.form.book;
      }
      Object.keys(this.form).map(formKey => {
        formData.append(formKey, this.form[formKey]);
      });

      if (!this.isEdit) {
        // in case create book
        this.createBook(formData);
      } else {
        // in case edit book
        formData.append("locale", this.locale);
        formData.append("_method", "put");
        this.editBook(formData, this.form.slug);
      }
    },
    async createBook(reqData) {
      try {
        const res = await StoreData({ reqName: "books", data: reqData });
        console.log(res);
        const { book } = res.data;
        this.$refs.table_ref.items.push(book);
      } catch (error) {
        console.log(error);
      } finally {
        this.btnLoading = false;
        this.onDialogClose();
        this.$refs.dialog_ref.toggleDialog();
      }
    },
    async editBook(reqData, slug) {
      try {
        const res = await UpdateData({
          reqName: "books",
          data: reqData,
          id: slug
        });

        const { book } = res.data;
        console.log(book);
        this.onDialogClose();

        this.$refs.table_ref.handleUpdateItems(book, this.bookIndex);
        this.$refs.dialog_ref.toggleDialog();
      } catch (error) {
        console.log(error);
      } finally {
        this.btnLoading = false;
      }
    },
    async handleShowData(slug, locale) {
      const res = await ShowData({ reqName: "books", id: slug, locale });
      const { book } = res.data;

      this.form = book;
    },
    UploadFile(file) {
      this.form.book_file = file.file;
    },
    handleOpenDialog() {
      this.$refs.dialog_ref.toggleDialog();
      this.resetToggle = false;
    },
    uploadPhoto(file) {
      this.form.main_image = file.file;
    },
    onDialogClose() {
      this.$v.$reset();
      this.isEdit = false;
      this.resetToggle = true;
      this.form = {
        name: "",
        short_description: "",
        main_image: "",
        book_file: ""
      };
    },
    handleEdit({ slug }, index) {
      this.bookIndex = index;
      this.$refs.dialog_ref.toggleDialog();
      this.resetToggle = false;
      this.isEdit = true;
      this.handleShowData(slug);
    },
    handleDelete({ slug }, index) {
      this.$refs.table_ref.handleDelete(slug, index);
    },
    showImagePreview(image) {
      if (image) {
        this.currentPreviewImage = image.path;
        this.imageOverlay = true;
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(150)
      },
      short_description: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255)
      }
    }
  }
};
</script>
