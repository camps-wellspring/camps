<template>
  <v-switch
    hide-details
    @change="handleToggle"
    v-model="toggleValue"
  ></v-switch>
</template>

<script>
import { updateToggle } from "@/api/toggle";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    modelName: {
      type: String,
      default: null
    },
    modelId: {
      type: Number,
      default: null
    },
    field: {
      type: String,
      default: null
    },
    value: {},
    validate: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.toggleValue = newValue;
      }
    }
  },
  data() {
    return {
      toggleValue: false
    };
  },
  methods: {
    handleToggle(toggleValue) {
      event.stopPropagation();
      if (this.isEdit) {
        if (this.validate) {
          this.validateMsg();
        } else {
          this.toggleRequest();
        }
      } else {
        if (toggleValue === null) {
          toggleValue = false;
        }
        this.$emit("input", toggleValue);
      }
    },
    toggleRequest() {
      let reqData = {
        name: this.modelName,
        id: this.modelId,
        field: this.field
      };
      updateToggle(reqData)
        .then(() => {})
        .catch(() => {
          this.toggleValue = !this.toggleValue;
        });
    },
    validateMsg() {
      this.popUp(this.$t("messages.warning"), "warning").then(value => {
        if (!value.dismiss) {
          this.toggleRequest();
        } else {
          this.toggleValue = !this.toggleValue;
        }
      });
    }
  }
};
</script>

<style></style>
