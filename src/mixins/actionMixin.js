import { UpdateData, StoreData } from "@/helpers/apiMethods";
import switchLocale from "@/mixins/switchLocale";

export default {
  mixins: [switchLocale],

  props: {
    currItem: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => {}
    },
    actionType: {
      type: String,
      default: ""
    },
    dialog: {
      type: Boolean,
      default: ""
    }
  },

  data() {
    return {
      imgUpdated: true,
      form: {},
      loading: {
        submit: false,
        fetch: false
      }
    };
  },

  computed: {
    itemId() {
      return this.config.idType ? this.config.idType : "id";
    }
  },

  watch: {
    currItem: {
      handler(value) {
        this.form = { ...value };
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    window.eventBus.$on("SET_DIALOG", value => {
      if (!value) {
        this.reset();
      }
    });
  },

  methods: {
    onSubmit() {
      if (this.actionType === "update") {
        this.update().then(() => this.imgUpdated && this.closeDialog());
      } else {
        this.create().then(() => this.closeDialog());
      }
    },

    update() {
      return new Promise(resolve => {
        this.loading.submit = true;
        let payload = {};
        for (const el in this.form) {
          this.form[el] && (payload[el] = this.form[el]);
        }
        payload.locale = this.currLocale;
        payload._method = "put";
        UpdateData({
          reqName: this.config.modelName,
          data: payload,
          id: this.currItem[this.itemId]
        })
          .then(() => {
            this.loading.submit = false;
            resolve();
          })
          .catch(() => (this.loading.submit = false));
      });
    },

    create() {
      return new Promise(resolve => {
        this.loading.submit = true;
        let payload = new FormData();
        for (const el in this.form) {
          payload.append(el, this.form[el]);
        }
        StoreData({
          reqName: this.config.modelName,
          data: payload
        })
          .then(() => {
            this.loading.submit = false;
            resolve();
          })
          .catch(() => (this.loading.submit = false));
      });
    },

    handleImg(img) {
      this.form[this.config.imgType] = img.file;
      this.imgUpdated = false;
      this.$v.form[this.config.imgType].$touch();
    },

    closeDialog() {
      this.reset();
      this.$emit("closed");
    },

    reset() {
      this.form = {};
      this.locale = this.$store.getters.locale;
    }
  }
};
