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
    }
  },

  data() {
    return {
      icon: null,
      locale: "",
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

  methods: {
    onSubmit() {
      if (this.actionType === "update") {
        this.update().then(() => this.closeDialog());
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
          reqName: this.modelName,
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
      this.loading.submit = true;
      let payload = new FormData();
      for (const el in this.form) {
        payload.append(el, this.form[el]);
      }
      StoreData({
        reqName: this.modelName,
        data: payload
      })
        .then(() => {
          this.loading.submit = false;
        })
        .catch(() => (this.loading.submit = false));
    },

    handleLocaleChange(locale) {
      this.loading.fetch = true;
      ShowData({ reqName: this.modelName, id: this.currItem.id, locale })
        .then(res => {
          this.locale = locale;
          this.form = res.data[Object.keys(res.data)[0]];
          this.loading.fetch = false;
        })
        .catch(() => (this.loading.fetch = false));
    },

    closeDialog() {
      this.reset();
      this.$emit("closed");
    },

    reset() {
      this.form = {};
      this.icon = null;
      this.locale = this.$store.getters.locale;
    }
  }
};
