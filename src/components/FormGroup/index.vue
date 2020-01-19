<template>
  <div>
    <slot
      :attrs="{
        errorMessages: getServerErrors || activeErrorMessages,
        label: this.$t(`fields.${name}`)
      }"
      :hasErrors="hasErrors"
      :listeners="{ input: () => preferredValidator.$touch() }"
    />
  </div>
</template>
<script>
import { singleErrorExtractorMixin } from "vuelidate-error-extractor";
export default {
  extends: singleErrorExtractorMixin,

  computed: {
    getServerErrors() {
      if (this.$store.getters.serverErrors) {
        return this.$store.getters.serverErrors[this.name];
      } else {
        return null;
      }
    }
  }
};
</script>
