import { UpdateData, ShowData, StoreData } from "@/helpers/apiMethods";

export default {
  props: {
    currItem: {
      type: Object,
      default: () => {}
    },
    actionType: {
      type: String,
      required: true
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      locale: "",
      imgUpdated: true,
      loading: {
        submit: false,
        fetch: false
      }
    };
  },

  computed: {
    currLocale() {
      return this.locale ? this.locale : this.$store.getters.locale;
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
          id: this.currItem.id
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

    handleLocaleChange(locale) {
      this.loading.fetch = true;
      ShowData({ reqName: this.config.modelName, id: this.currItem.id, locale })
        .then(res => {
          this.locale = locale;
          this.form = res.data[Object.keys(res.data)[0]];
          this.loading.fetch = false;
        })
        .catch(() => (this.loading.fetch = false));
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
