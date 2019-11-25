<template>
  <v-container>
    <form-wrapper :validator="$v.form">
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="nubmerField in $v.form.numbersFields.$each.$iter"
          :key="nubmerField.id"
        >
          <form-group name="numbersFields" :validator="nubmerField.value">
            <v-text-field
              slot-scope="{ attrs }"
              v-bind="attrs"
              outlined
              :label="$t(`label.${nubmerField.$model.icon}`)"
              v-model="nubmerField.$model.value"
              @input="nubmerField.value.$touch()"
            ></v-text-field>
          </form-group>
        </v-col>
        <v-col
          cols="12"
          md="6"
          v-for="urlInput in $v.form.urlsInputs.$each.$iter"
          :key="urlInput.id"
        >
          <form-group name="urlsInputs" :validator="urlInput.value">
            <v-text-field
              slot-scope="{ attrs }"
              v-bind="attrs"
              outlined
              :label="$t(`label.${urlInput.$model.icon}`)"
              v-model="urlInput.$model.value"
              @input="urlInput.value.$touch()"
            ></v-text-field>
          </form-group>
        </v-col>
        <v-col
          cols="12"
          md="6"
          v-for="emailInput in $v.form.emailsInput.$each.$iter"
          :key="emailInput.id"
        >
          <form-group name="urlsInputs" :validator="emailInput.value">
            <v-text-field
              slot-scope="{ attrs }"
              v-bind="attrs"
              outlined
              :label="$t(`label.${emailInput.$model.icon}`)"
              v-model="emailInput.$model.value"
              @input="emailInput.value.$touch()"
            ></v-text-field>
          </form-group>
        </v-col>
        <v-btn
          :disabled="$v.form.$invalid"
          @click.prevent="handleSubmit"
          class="primary"
        >
          {{ $t("button.save") }}
        </v-btn>
      </v-row>
    </form-wrapper>
  </v-container>
</template>

<script>
import {
  numeric,
  url,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import { StoreData } from "@/helpers/apiMethods";

export default {
  name: "ContactComponent",
  props: {
    settings: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        numbersFields: [
          { id: 1, value: "", icon: "phone" },
          { id: 3, value: "", icon: "whats_app" },
          { id: 5, value: "", icon: "imo" }
        ],
        urlsInputs: [{ id: 4, value: "", icon: "skype" }],
        emailsInput: [
          { id: 2, value: "", icon: "email" },
          { id: 6, value: "", icon: "facetime" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      const formData = new FormData();
      const { numbersFields, urlsInputs, emailsInput } = this.form;
      const contacts = [...numbersFields, ...urlsInputs, ...emailsInput];
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
    },
    selectedSettings(settings, type, contactsTypes) {
      const setting = settings[type];
      if (setting) {
        // important
        setting.forEach(setting => {
          this.form[contactsTypes].forEach((contact, index) => {
            if (contact.id === setting.id) {
              this.$set(this.form[contactsTypes], index, setting);
            }
          });
        });
      }
    }
  },
  validations() {
    return {
      form: {
        numbersFields: {
          $each: {
            value: {
              numeric,
              minLength: minLength(9),
              maxLength: maxLength(14)
            }
          }
        },
        urlsInputs: {
          $each: {
            value: {
              url
            }
          }
        },
        emailsInput: {
          $each: {
            value: {
              email
            }
          }
        }
      }
    };
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          Object.keys(this.form).map(key => {
            this.selectedSettings(settings, "contacts", key);
          });
        }
      },
      immediate: true
    }
  }
};
</script>
