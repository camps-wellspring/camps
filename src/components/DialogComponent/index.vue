<template>
  <v-dialog v-model="showDialog" max-width="900">
    <v-card>
      <v-card-title class="headline grey lighten-2 mb-5" primary-title>
        <slot name="heading"></slot>
        <v-spacer />
        <v-btn icon>
          <v-icon @click="showDialog = false">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <slot name="body"></slot>
      </v-card-text>

      <!-- <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions">asdasdadas</slot>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogComponnet",
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  watch: {
    showDialog: {
      handler(value) {
        if (!value) {
          window.eventBus.$emit("SET_DIALOG", value);
        }
      },
      immediate: true
    }
  }
};
</script>
