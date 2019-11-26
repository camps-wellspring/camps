<template>
  <section>
    <label class="text-editor__label" v-text="$t(`label.${fieldName}`)"></label>
    <form-group :name="fieldName">
      <VueEditor
        class="editor"
        v-model="form[fieldName]"
        slot-scope="{ attrs }"
        v-bind="attrs"
        :editorToolbar="customToolbar"
        v-input-validation="fieldName"
      />
    </form-group>

    <transition name="fadeIn" mode="in-out">
      <span
        class="editor__errors"
        v-if="validationErrors.ErrorsKeys.includes(fieldName)"
        >{{ validationErrors.serverError }}
      </span>
    </transition>

    <br />
    <v-btn
      :loading="loadingButton"
      @click.prevent="handleSubmit"
      :disabled="form[fieldName] === ''"
      class="primary my-3"
      type="submit"
      >{{ $t("button.save") }}</v-btn
    >
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { StoreData } from "@/helpers/apiMethods";

export default {
  name: "Editor",
  inject: ["$v"],
  props: {
    fieldName: {
      type: String
    },
    language: {
      type: String,
      default: "en"
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VueEditor
  },
  methods: {
    handleSubmit() {
      this.loadingButton = true;
      const reqData = {
        [this.fieldName]: this.form[this.fieldName],
        locale: this.language
      };
      StoreData({ reqName: "settings", data: reqData })
        .catch(err => console.log(err))
        .finally(() => (this.loadingButton = false));
    },
    checkValid() {
      const value = this.form[this.fieldName].length;

      if (value < 3 || value > 100) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      loadingButton: false,
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ align: "" }, { align: "justify" }, { align: "right" }],
        [{ font: [] }],
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ size: ["small", false, "large", "huge"] }],

        [{ header: 1 }, { header: 2 }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],

        [{ direction: "rtl" }],
        ["clean"]
      ]
    };
  }
};
</script>
