import generateTableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";
import imgPreviewMixin from "@/mixins/imgPreview";

export default {
  mixins: [imgPreviewMixin],

  data() {
    return {
      items: [],
      actionType: "",
      editingItem: {},
      loading: {
        table: false
      },
      dialog: false
    };
  },

  computed: {
    headers() {
      return generateTableHeaders(this.headerValues);
    },
    dialogTitle() {
      return this.actionType === "update"
        ? this.$t("heading.edit")
        : this.$t("heading.create");
    }
  },

  created() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      this.loading.table = true;
      IndexData({ reqName: this.config.modelName })
        .then(res => {
          this.items = res.data.data;
          this.loading.table = false;
        })
        .catch(() => (this.loading.table = false));
    },

    initDialog(type, currItem) {
      this.actionType = type;
      type === "update"
        ? (this.editingItem = currItem)
        : (this.editingItem = this.model);
      this.dialog = true;
    },

    handleDialogClose() {
      this.dialog = false;
      this.fetchItems();
    },

    handleDelete(id, index) {
      this.popUp(this.$t("message.delete")).then(value => {
        if (!value.dismiss) {
          this.loading.table = true;
          DeleteData({ reqName: this.config.modelName, id })
            .then(() => {
              this.items.splice(index, 1);
              this.loading.table = false;
            })
            .catch(() => {
              this.loading.table = false;
            });
        }
      });
    }
  }
};
