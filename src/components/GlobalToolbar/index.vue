<template>
  <v-toolbar flat color="white" class="main-header">
    <v-toolbar-title class="main-header__title">
      <a class="main-header__title__back-link" @click="$router.go(-1)">
        &lt; {{ $t("button.back") }}
      </a>
      <h4 class="main-header__title__header">
        {{ $t(`heading.${title}`) }}
      </h4>
    </v-toolbar-title>

    <!-- Locale Section -->
    <v-spacer v-if="includeLocale"></v-spacer>
    <section v-if="formMode === 'edit' && includeLocale" class="my-auto">
      <locale-select @change="fireLocaleChange" />
    </section>
    <!-- Locale Section -->

    <v-spacer v-if="actionsType !== 'noActions' || includeLocale"></v-spacer>
    <v-toolbar-items
      v-if="actionsType !== 'noActions'"
      class="main-header__contents"
    >
      <!-- Form Section -->
      <template v-if="actionsType === 'form'">
        <v-btn
          class="button btn-height--1 my-auto mx-1"
          :class="{
            'button--add': formMode === 'add',
            'button--edit': formMode === 'edit'
          }"
          :loading="loading.saveBtn"
          :disabled="!formValidation"
          @click="fireFormAction"
        >
          <i class="icon-showpassword"></i>
          <span class="mx-2">{{
            formMode === "edit" ? $t("button.edit") : $t("button.save")
          }}</span>
        </v-btn>
        <v-btn
          v-if="formMode === 'edit'"
          class="button button--reset btn-height--1 my-auto mx-1"
          @click="fireFormReset"
        >
          <i class="icon-showpassword"></i>
          <span class="mx-2">{{ $t("button.reset") }}</span>
        </v-btn>
      </template>
      <!-- Form Section -->

      <!-- Filter Section-->
      <template v-if="actionsType === 'filter'">
        <v-btn
          class="button btn-height--1 button--submit my-auto"
          :loading="loading.filter"
          :disabled="!filterValidation"
          @click="fireFilter"
        >
          <span class="mx-2">{{ $t("button.search") }}</span>
        </v-btn>
        <v-btn
          v-if="filterMode"
          class="button button--reset btn-height--1 my-auto mx-1"
          @click="fireClearFilter"
        >
          <span class="mx-2">{{ $t("button.clear_filter") }}</span>
        </v-btn>
      </template>
      <!-- Filter Section -->
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
    includeLocale: {
      type: Boolean,
      default: false
    },
    actionsType: {
      type: String,
      default: "noActions"
    },
    formMode: {
      type: String,
      default: "add"
    },
    formValidation: {
      type: Boolean,
      default: false
    },
    filterMode: {
      type: Boolean,
      default: false
    },
    filterValidation: {
      type: Boolean,
      default: false
    },
    stopLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: {
        save: false,
        filter: false
      }
    };
  },
  methods: {
    fireLocaleChange(locale) {
      this.$emit("localeChange", locale);
    },
    fireFormAction() {
      this.loading.save = true;
      this.$emit("FormAction");
    },
    fireFormReset() {
      this.$emit("FormReset");
    },
    fireFilter() {
      this.loading.filter = true;
      this.$emit("Filter");
    },
    fireClearFilter() {
      this.$emit("ClearFilter");
    },
    stopLoaders() {
      this.loading = {
        save: false,
        filter: false
      };
    }
  },
  watch: {
    stopLoading: {
      handler(stop) {
        if (stop === true) {
          this.stopLoaders();
        }
      }
    }
  }
};
</script>

<!--
    Notes:
        - props:
            - title: Takes the title that included within the heading object in the translation file.
            - includeLocale: Sets it (true) when you need a locale field within the toolbar (in case of edit form).
            - actionsType: takes (noActions) by default to determine that no action buttens are needed
                        or (form) to determine that form buttons are needed
                        or (filter) to determine that filter buttons are needed.
            - formMode: Determines the current form mode ((add) or (edit)).
            - formValidation: Determines whether the form is valid or not in the form mode.
            - filterMode: Determines the current mode of the filter.
                        when a filter is applied you must set it to (true) to show the clear button.
                        when no filter is applied set it to (false) and the clear button won't be visible.
            - filterValidation: Determines whether the filter fields is valid or not in case of validation check is needed.
            - stopLoading: Stops any loaders that were fired on buttons.
        
        - actions:
            - localeChange: Emits the current value of the locale field whenever changed.
            - FormAction: Emits on (save) button click.
            - FormReset: Emits on (reset) button click.
            - Filter: Emits on (filter) button click.
            - ClearFilter: Emits on (clear filter) button click.
-->
