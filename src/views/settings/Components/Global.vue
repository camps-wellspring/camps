<template>
  <v-container>
    <WrappingComponent :settings="settings" :formData="form" />
    <v-form>
      <form-wrapper :validator="$v.locations">
        <v-row>
          <v-col cols="12" md="6">
            <form-group
              name="global_contact_location_1"
              attribute="input.global_contact_location_1"
            >
              <v-textarea
                :label="$t('label.global_contact_location_1')"
                outlined
                v-bind="attrs"
                v-on="listeners"
                slot-scope="{ attrs, listeners }"
                v-model="locations.global_contact_location_1"
              ></v-textarea>
            </form-group>
            <v-btn
              class="primary"
              :disabled="$v.locations.global_contact_location_1.$invalid"
              @click.prevent="handleSubmit('global_contact_location_1')"
              >{{ $t("button.save") }}</v-btn
            >
          </v-col>
          <v-col cols="12" md="6">
            <form-group
              name="global_contact_location_2"
              attribute="input.global_contact_location_2"
            >
              <v-textarea
                :label="$t('label.global_contact_location_2')"
                outlined
                v-bind="attrs"
                v-on="listeners"
                slot-scope="{ attrs, listeners }"
                v-model="locations.global_contact_location_2"
              ></v-textarea>
            </form-group>
            <v-btn
              class="primary"
              :disabled="$v.locations.global_contact_location_2.$invalid"
              @click.prevent="handleSubmit('global_contact_location_2')"
              >{{ $t("button.save") }}</v-btn
            >
          </v-col>
        </v-row>
      </form-wrapper>
    </v-form>
  </v-container>
</template>

<script>
import { minLength, maxLength } from "vuelidate/lib/validators";
import { StoreData } from "@/helpers/apiMethods";
export default {
  name: "Global",
  props: {
    settings: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    WrappingComponent: () => import("./WrappingComponent")
  },

  data() {
    return {
      form: {
        global_start_project_description: "",
        global_subscription_description: ""
      },
      locations: {
        global_contact_location_1: "",
        global_contact_location_2: ""
      }
    };
  },
  methods: {
    handleSubmit(nameType) {
      const reqData = { [nameType]: this.locations[nameType] };
      StoreData({ reqName: "settings", data: reqData })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  },
  validations() {
    return {
      locations: {
        global_contact_location_1: {
          minLength: minLength(3),
          maxLength: maxLength(50)
        },
        global_contact_location_2: {
          minLength: minLength(3),
          maxLength: maxLength(50)
        }
      }
    };
  },
  watch: {
    settings: {
      handler(settings) {
        if (settings) {
          Object.keys(this.locations).map(key => {
            this.locations[key] = settings[key];
          });
        }
      },
      immediate: true
    }
  }
};
</script>
