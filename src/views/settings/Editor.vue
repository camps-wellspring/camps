<template>
  <section>
    <form-group :name="fieldName">
      <VueEditor
        class="editor"
        :placeholder="$t(`label.${fieldName}`)"
        v-model="form[fieldName]"
        slot-scope="{ attrs }"
        v-bind="attrs"
        :editorToolbar="customToolbar"
        v-input-validation="{ inputValue: form[fieldName], min: 3, max: 100 }"
      />
    </form-group>
    <!-- <transition name="fadeIn" mode="in-out">
      <span v-if="checkValid()" class="editor__errors">{{
        validationErrors.err
      }}</span>
    </transition> -->
    <br />
    <v-btn
      @click.prevent="handleSubmit"
      :disabled="$v.form.$invalid"
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
      const reqData = {
        [this.fieldName]: this.form[this.fieldName],
        locale: "en"
      };
      StoreData({ reqName: "settings", data: reqData })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
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
