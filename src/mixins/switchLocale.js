import { ShowData } from "@/helpers/apiMethods";

export default {
  data() {
    return {
      locale: ""
    };
  },

  computed: {
    currLocale() {
      return this.locale ? this.locale : this.$store.getters.locale;
    }
  },

  methods: {
    handleLocaleChange(locale) {
      this.loading.fetch = true;
      ShowData({
        reqName: this.config.modelName,
        id: this.currItem[this.config.idType || "id"],
        locale
      })
        .then(res => {
          this.locale = locale;
          this.form = res.data[Object.keys(res.data)[0]];
          this.loading.fetch = false;
        })
        .catch(() => (this.loading.fetch = false));
    }
  }
};
