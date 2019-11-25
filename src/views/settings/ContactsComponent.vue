<template>
  <form-wrapper :validator="$v.form">
    <v-row>
      <v-col cols="12" md="6" v-for="contact in $v.form.contacts.$each.$iter" :key="contact.id">
        <form-group name="contacts" :validator="contact.value">
          <v-text-field
            slot-scope="{ attrs }"
            v-bind="attrs"
            outlined
            :label="$t(`label.${contact.$model.type}`)"
            v-model="contact.$model.value"
            @input="contact.value.$touch()"
          ></v-text-field>
        </form-group>
        <v-btn @click.prevent="handleSubmit" class="primary">{{ $t("button.save") }}</v-btn>
      </v-col>
    </v-row>
  </form-wrapper>
</template>

<script>
import { numeric, url, email } from "vuelidate/lib/validators";
import { StoreData } from "@/helpers/apiMethods";
const customFunc = value => {
  console.log(value);
  return value.map(el => {
    if (el.type === "phone") {
      return {
        numeric
      };
    }
    console.log(el.type);
    if (el.type === "email") {
      return {
        email
      };
    }
  })[0];
};
export default {
  name: "ContactComponent",
  data() {
    return {
      form: {
        contacts: [
          { id: 1, value: "", type: "phone" },
          { id: 2, value: "", type: "email" },
          { id: 4, value: "", type: "skype" },
          { id: 5, value: "", type: "skype" },
          { id: 3, value: "", type: "whats_app" },
          { id: 6, value: "", type: "facetime" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      const formData = new FormData();
      const { contacts } = this.form;
      contacts.map((el, index) => {
        if (el.value !== "") {
          formData.append(`contacts[${index}][id]`, el.id);
          formData.append(`contacts[${index}][value]`, el.value);
        }
      });
      StoreData({ reqName: "settings", data: formData })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  },
  validations() {
    return {
      form: {
        contacts: {
          $each: {
            value: customFunc(this.form.contacts)
          }
        }
      }
    };
  }
};
</script>
