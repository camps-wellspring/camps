<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-form @submit.prevent="handleLogin">
                <v-card-text>
                  <form-group
                    name="email"
                    :validator="$v.email"
                    attribute="fields.email"
                  >
                    <template slot-scope="{ attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-model="email"
                        @input="$v.email.$touch()"
                        type="email"
                      >
                      </v-text-field>
                    </template>
                  </form-group>

                  <form-group
                    name="password"
                    :validator="$v.password"
                    attribute="fields.password"
                  >
                    <template slot-scope="{ attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-model="password"
                        @input="$v.password.$touch()"
                        type="password"
                      >
                      </v-text-field>
                    </template>
                  </form-group>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" type="submit">
                    {{ $t("form_box.login") }}</v-btn
                  >
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  data() {
    return {
      email: "",
      password: "",

      loading: false,
      redirect: undefined
    };
  },
  methods: {
    handleLogin() {
      if (this.$v.$invalid) {
        return;
      } else {
        console.log("request 2");
        let data = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("LoginByEmail", data)
          .then(() => {
            this.$router.push({ path: this.redirect || "/" });
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style scoped></style>
