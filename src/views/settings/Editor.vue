<template>
  <section>
    <form-group :name="fieldName">
      <VueEditor
        :placeholder="$t(`label.${fieldName}`)"
        v-model="form[fieldName]"
        slot-scope="{ attrs }"
        v-bind="attrs"
        :editorToolbar="customToolbar"
        @selection-change="$v.form[fieldName].$touch()"
      />
    </form-group>
    <v-btn :disabled="$v.form.$invalid" class="primary my-3" type="submit">{{
      $t("button.save")
    }}</v-btn>
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "Editor",
  inject: ["$v"],
  props: {
    fieldName: {
      type: String
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VueEditor
  },
  data() {
    return {
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
