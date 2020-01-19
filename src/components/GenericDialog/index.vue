<template>
  <v-dialog max-width="800px" v-model="dialog">
    <v-card>
      <v-card-title class="card-title"
        ><slot name="card-title"></slot
      ></v-card-title>
      <v-card-text>
        <slot name="card-text"></slot>
      </v-card-text>
      <v-card-actions>
        <slot name="card-actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GenericDialog",
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    }
  },
  watch: {
    dialog: {
      handler(value) {
        if (!value) {
          this.$emit("dialog_closed");
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
.card-title {
  background-color: #444;
  color: #fff;
}
</style>
