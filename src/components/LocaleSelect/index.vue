<template>
  <div>
    <v-select
      :items="items"
      :value="localeValue"
      label="Language"
      outlined
      @change="handleChange"
      v-bind="$attrs"
      :loading="loading"
      loader-height="5"
    ></v-select>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      items: [{ text: "English", value: "en" }, { text: "Arabic", value: "ar" }]
    };
  },
  computed: {
    localeValue() {
      return this.$store.getters.locale;
    }
  },
  beforeDestroy() {
    this.$store.commit("RESET_LOCALE");
  },
  methods: {
    handleChange(value) {
      this.$store.commit("SET_LOCALE", value);

      this.$emit("change", value);
    }
  }
};
</script>
