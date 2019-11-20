<template>
  <main>
    <v-toolbar flat color="white" class="mb-4">
      <v-toolbar-title>{{ $t("heading.topics") }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="dialog = !dialog">
        {{ $t("button.create") }}
      </v-btn>
    </v-toolbar>
    <!-- table -->
    <wrapping-table :headersName="$options.headersName" pathName="topics" ref="table_ref">
      <template slot-scope="{ item, index }">
        <td>{{ item.name }}</td>
        <td>
          <v-icon small title="edit" @click="handleEdit(item, index)"> mdi-pencil</v-icon>
          <v-icon small title="delete" @click="handleDelete(item, index)"> mdi-delete</v-icon>
        </td>
      </template>
    </wrapping-table>
    <!-- table -->
    <!-- dialog -->
    <DialogComponent v-model="dialog">
      <template #heading>
        <v-card-title>{{ dialogTitle }}</v-card-title>
      </template>
      <template #body>
        <v-col cols="12" v-if="isEdited">
          <locale-select @change="fireLocaleChange" />
        </v-col>
        <v-container>
          <form-wrapper :validator="$v.form">
            <v-form @submit.prevent="handleSubmit">
              <v-col cols="12">
                <TextField :model="form" fieldName="name" />
              </v-col>
              <v-col cols="12">
                <v-btn
                  type="submit"
                  class="primary"
                  :disabled="$v.form.$invalid"
                  :loading="btnLoading"
                  >{{ $t("button.save") }}</v-btn
                >
                <v-btn class="warning mx-2" @click="dialog = !dialog">{{
                  $t("button.close")
                }}</v-btn>
              </v-col>
            </v-form>
          </form-wrapper>
        </v-container>
      </template>
    </DialogComponent>
    <!-- dialog -->
  </main>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { StoreData, ShowData, UpdateData } from "@/helpers/apiMethods";
import cookie from "js-cookie";

export default {
  headersName: ["name", "configs"],
  name: "Topcis",
  data() {
    return {
      isEdited: false,
      btnLoading: false,
      dialog: false,
      form: {
        name: ""
      },
      topicId: "",
      topicIndex: "",
      locale: cookie.get("language")
    };
  },

  methods: {
    fireLocaleChange(locale) {
      this.locale = locale;
      this.handleShowData(locale);
    },
    handleCreateState() {
      StoreData({ reqName: "topics", data: this.form })
        .then(res => {
          const { topic } = res.data;
          this.$refs.table_ref.items.push(topic);
          this.resetDialog();
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.btnLoading = false;
        });
    },
    handleUpdateState() {
      UpdateData({
        reqName: "topics",
        data: { ...this.form, _method: "put", locale: this.locale },
        id: this.topicId
      })
        .then(res => {
          const { topic } = res.data;
          const { items } = this.$refs.table_ref;
          this.$set(items, this.topicIndex, topic);

          this.resetDialog();

          console.log(topic);
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.btnLoading = false;
        });
    },
    handleShowData(locale) {
      ShowData({ reqName: "topics", id: this.topicId, locale })
        .then(res => {
          const { topic } = res.data;
          this.form = topic;
          console.log(res);
        })
        .catch(err => console.log(err));
    },
    resetDialog() {
      this.$v.form.$reset();
      this.form = {};
      this.btnLoading = false;
      this.dialog = false;
      this.isEdited = false;
      this.$store.dispatch("ClearServerErrors");
    },
    handleSubmit() {
      this.btnLoading = true;
      if (!this.isEdited) {
        // in case create
        this.handleCreateState();
      } else {
        // in case upadate
        this.handleUpdateState();
      }
    },
    handleDelete({ id }, index) {
      this.$refs.table_ref.handleDelete(id, index);
    },
    handleEdit({ id }, index) {
      this.topicId = id;
      this.topicIndex = index;
      this.dialog = true;
      this.isEdited = true;
      this.handleShowData(this.locale);
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(50)
      }
    }
  },
  computed: {
    dialogTitle() {
      if (!this.isEdited) {
        return this.$t("heading.create");
      } else {
        return this.$t("heading.edit");
      }
    }
  },
  watch: {
    dialog: {
      handler(value) {
        if (!value) {
          this.resetDialog();
        }
      },
      immediate: true
    }
  }
};
</script>
