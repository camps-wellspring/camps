<template>
  <v-toolbar flat class="main-header">
    <v-toolbar-title class="main-header__title">
      <a class="main-header__title__back-link" @click="$router.go(-1)">
        &lt; {{ $t("button.back") }}
      </a>
      <h4 class="main-header__title__header">
        {{ $t(`heading.${title}`) }}
      </h4>
    </v-toolbar-title>

    <v-spacer v-if="actionButton"></v-spacer>
    <v-toolbar-items v-if="actionButton" class="main-header__contents">
      <!-- Action Button Section -->
      <v-btn
        :loading="loading"
        :disabled="disabled"
        class="button btn-height--1 my-auto mx-1"
        color="primary"
        @click="fireButtonClick"
      >
        <span class="mx-2">{{ $t(`button.${actionButtonText}`) }}</span>
      </v-btn>
      <!-- Form Section -->
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "globalToolbar",
  props: {
    title: {
      type: String,
      default: "title"
    },
    actionButtonText: {
      type: String,
      default: "create"
    },
    actionButton: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    fireButtonClick() {
      this.$emit("ButtonClicked");
    }
  }
};
</script>

<!--
    Notes:
        - props:
            - title: Takes the title that included within the heading object in the translation file.
            - actionButtonText: Takes the button text that included within the button object in the translation file.
            - actionButton: Determines Whether to imbed a button or not.
        - actions:
            - ButtonClicked: Emits on button click.
-->
