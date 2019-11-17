<template>
  <main>
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.contacts") }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
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
          <td>{{ item.user_name }}</td>
          <td>{{ item.user_email }}</td>
          <td>{{ item.user_phone }}</td>
          <td :title="item.message">{{ item.message | truncate }}</td>
          <td>
            <v-icon medium title="edit" @click="handleEdit(item, index)"
              >mdi-pencil</v-icon
            >
            <v-icon medium title="delete" @click="handleDelete(item, index)"
              >mdi-delete</v-icon
            >
            <v-icon medium title="attachment" @click="showAttachments(item)"
              >mdi-attachment</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- table -->
    <!-- pagination -->
    <div class="text-xs-center mt-4">
      <v-pagination
        v-if="items.length > 0 && pagination.last_page > 1"
        v-model="pagination.current_page"
        :length="pagination.last_page"
        :total-visible="10"
        @input="handlePagination"
      ></v-pagination>
    </div>
    <!-- pagination -->
    <!-- Image Preview -->
    <global-image-preview
      :showDialog="imageOverlay"
      :imagePath="currentPreviewImage"
      @closePreview="imageOverlay = false"
    />
    <!-- Image Preview -->
    <!-- dialog -->
    <DialogComponent v-model="dialog">
      <template #heading>
        <v-card-title>{{ $t("heading.edit") }}</v-card-title>
      </template>
      <template #body>
        <FormComponent
          @click="dialog = false"
          @close_dialog="dialog = false"
          :id="id"
          @toggleEdit="isEdit = false"
          :isEdited="isEdited"
          @set_edite="UpdateContacts"
        />
      </template>
    </DialogComponent>
    <!-- dialog -->
    <!-- anotherDialog -->
    <DialogComponent v-model="anotherDialog">
      <template #heading>
        <v-card-title>{{ $t("heading.attachments") }}</v-card-title>
      </template>
      <template #body>
        <v-row>
          <v-col cols="12" md="4" v-for="(photo, index) in photos" :key="index">
            <v-img fluid aspect-ratio="1" :src="photo && photo.path"></v-img>
          </v-col>
          <v-col cols="12" md="4" v-for="(file, key) in pdfFiles" :key="key">
            <router-link :to="file.path" target="_blank">
              <v-img
                title="pdf"
                fluid
                aspect-ratio="1"
                :src="require('@/assets/imgs/pdf-icon.png')"
              ></v-img>
            </router-link>
          </v-col>
        </v-row>
      </template>
    </DialogComponent>
    <!-- anotherDialog -->
  </main>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";
import { isEqual } from "lodash";
export default {
  name: "Contacts",
  components: {
    FormComponent: () => import("./FormComponent")
  },

  data() {
    return {
      headers: [],
      items: [],
      tableLoading: true,
      pagination: {},
      queries: {},
      imageOverlay: false,
      currentPreviewImage: "",
      dialog: false,
      id: "",
      contactIndex: "",
      isEdited: false,
      photos: [],
      pdfFiles: [],
      anotherDialog: false
    };
  },
  mounted() {
    this.handleCreateHeaders();
    this.handleGetContacts();
  },
  methods: {
    showAttachments({ attachments }) {
      this.anotherDialog = !this.anotherDialog;

      attachments.map(el => {
        if (el.type === "photo") {
          this.photos.push(el);
        } else if (el.type === "file") {
          this.pdfFiles.push(el);
        }
      });
    },
    showImagePreview(image) {
      if (image) {
        this.currentPreviewImage = image.path;
        this.imageOverlay = true;
      }
    },
    handlePagination(page) {
      this.queries = { ...this.queries, page };
      if (!isEqual(this.queries, this.$route.query)) {
        this.$router.push({ query: this.queries });
      }
    },
    handleCreateHeaders() {
      const headerList = ["name", "email", "phone", "messages", "configs"];
      this.headers = TableHeaders(headerList);
    },
    handleGetContacts(query) {
      IndexData({ reqName: "contact-messages", query })
        .then(res => {
          this.tableLoading = false;
          const { data, meta } = res.data;
          this.pagination = meta;
          this.items = data;
          console.log(data);
        })
        .catch(err => console.log(err));
    },
    handleDelete({ id }, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: "contact-messages", id })
            .then(() => {
              this.$delete(this.items, index);
            })
            .catch(err => console.log(err));
        }
      });
    },
    handleEdit({ id }, index) {
      this.dialog = true;
      this.contactIndex = index;
      this.isEdited = true;
      this.id = id;
    },
    UpdateContacts(contact) {
      console.log(contact);
      this.$set(this.items, this.contactIndex, contact);
    }
  },
  watch: {
    $route: {
      handler({ query }) {
        this.queries = query;
        this.handleGetContacts(this.queries);
      },
      immediate: true
    },
    dialog: {
      handler(value) {
        if (!value) {
          this.isEdited = false;
        }
      },
      immediate: true
    },
    anotherDialog: {
      handler(value) {
        if (!value) {
          this.photos = [];
          this.pdfFiles = [];
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
