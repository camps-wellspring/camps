<template>
  <v-container>
    <form-wrapper :validator="$v.form">
      <form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12">
            <v-switch
              :label="$t('label.close')"
              v-model="form.closed"
              :disabled="form.status && form.status === 2"
            ></v-switch>
          </v-col>
          <v-col
            cols="12"
            md="6"
            v-for="(field, index) in nameFields"
            :key="index"
          >
            <TextField :model="form" :fieldName="field" />
          </v-col>
          <v-col cols="12" md="6">
            <TextField
              :model="form"
              fieldName="topic_id"
              inputType="select"
              :loading="loading"
              :items="items"
            />
          </v-col>
          <v-col cols="12">
            <TextField :model="form" fieldName="message" inputType="textarea" />
          </v-col>
          <v-col cols="12">
            <v-btn
              type="submit"
              class="primary"
              :disabled="$v.form.$invalid"
              :loading="btnLoading"
              >{{ $t("button.save") }}</v-btn
            >
            <v-btn class="warning mx-2" v-on="$listeners">{{
              $t("button.close")
            }}</v-btn>
          </v-col>
        </v-row>
      </form>
    </form-wrapper>
  </v-container>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  numeric,
  email
} from "vuelidate/lib/validators";
import { UpdateData, IndexData, ShowData } from "@/helpers/apiMethods";
import Cookies from "js-cookie";
export default {
  name: "FormComponent",
  props: {
    id: {
      type: Number,
      required: true
    },
    isEdited: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      form: {
        user_name: "",
        user_phone: "",
        user_email: "",
        topic_id: "",
        message: "",
        closed: false
      },
      nameFields: ["user_name", "user_email", "user_phone"],
      btnLoading: false,
      loading: true,
      items: [],
      locale: Cookies.get("language")
    };
  },
  methods: {
    resetData() {
      this.$emit("close_dialog");
      this.$v.form.$reset();
      this.form = {};
      this.btnLoading = false;
      this.$store.dispatch("ClearServerErrors");
    },
    toggleDialog() {
      window.eventBus.$on("SET_DIALOG", value => {
        if (!value) {
          this.resetData();
          console.log(value);
          this.$emit("toggleEdit");
        }
      });
    },
    handleShowData() {
      if (this.id) {
        ShowData({ reqName: "contact-messages", id: this.id })
          .then(res => {
            const { contact_message } = res.data;
            this.form = contact_message;
            this.form.topic_id = contact_message.topic.id;
            if (contact_message.status === 2) {
              this.form.closed = true;
            }
            delete this.form.topic;
            delete this.form.attachments;
            console.log(contact_message);
          })
          .catch(err => console.log(err));
      }
    },
    handleGetTopics() {
      IndexData({ reqName: "topics" })
        .then(res => {
          this.loading = false;
          const { data } = res.data;
          this.items = data;
          console.log(data);
        })
        .catch(err => console.log(err));
    },
    handleSubmit() {
      this.btnLoading = true;
      const reqData = { ...this.form, _method: "put", locale: this.locale };
      UpdateData({ reqName: "contact-messages", data: reqData, id: this.id })
        .then(res => {
          const { contact_message } = res.data;

          this.$emit("set_edite", contact_message);
          this.resetData();
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.btnLoading = false;
        });
    }
  },
  mounted() {
    this.toggleDialog();

    this.handleGetTopics();
  },
  validations() {
    return {
      form: {
        user_name: {
          required,
          maxLength: maxLength(20)
        },
        user_phone: {
          numeric,
          required,
          maxLength: maxLength(20)
        },
        user_email: {
          required,
          email
        },
        topic_id: {
          required,
          type: String
        },
        message: {
          required,
          minLength: minLength(15),
          maxLength: maxLength(500)
        }
      }
    };
  },
  watch: {
    isEdited: {
      handler(value) {
        if (value) {
          this.handleShowData();
          console.log(value);
        }
      },
      immediate: true
    }
  }
};
</script>
