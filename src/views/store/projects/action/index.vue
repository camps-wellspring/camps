<template>
  <v-container>
    <locale-select
      v-if="actionType === 'update'"
      :loading="loading.fetch"
      @change="handleLocaleChange"
    />

    <form-wrapper :validator="$v.form">
      <form @submit.prevent="onSubmit">
        <v-card>
          <v-card-title>{{ $t("heading.main_info") }}</v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="6">
                  <form-group name="name">
                    <template slot-scope="{ attrs }">
                      <v-text-field
                        v-model="form.name"
                        v-bind="attrs"
                        outlined
                        :label="$t('label.name')"
                        @blur="$v.form.name.$touch()"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>

                <v-col cols="12" md="6">
                  <form-group name="description">
                    <template slot-scope="{ attrs }">
                      <v-textarea
                        v-model.trim="form.description"
                        v-bind="attrs"
                        outlined
                        :label="$t('label.description')"
                        @blur="$v.form.description.$touch()"
                      ></v-textarea>
                    </template>
                  </form-group>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>

        <!-- <v-col cols="12" md="6">
          <form-group :name="config.imgType">
            <template slot-scope="{ attrs }">
              <new-image-upload
                class="file-upload__image"
                :imgUrl="form[config.imgType] && form[config.imgType].path"
                :imgId="form[config.imgType] && form[config.imgType].id"
                @fileSelected="handleImg"
                @ImageUpdated="imgUpdated = true"
                v-bind="attrs"
              />
            </template>
          </form-group>
        </v-col> -->

        <v-col cols="12">
          <v-btn
            type="submit"
            class="primary"
            :disabled="$v.form.$invalid"
            :loading="loading.submit"
            >{{ $t("button.submit") }}</v-btn
          >
        </v-col>
      </form>
    </form-wrapper>
  </v-container>
</template>

<script>
import { minLength, maxLength, required } from "vuelidate/lib/validators";
import { minWords, maxWords } from "@/utils/validate";
import switchLocale from "@/mixins/switchLocale";

export default {
  name: "Platforms",

  mixins: [switchLocale],

  data() {
    return {
      form: {
        name: "",
        description: "",
        short_description: "",
        main_media: null
      },

      loading: {
        submit: false,
        fetch: false
      }
    };
  },

  computed: {
    actionType() {
      const pathArr = this.$route.path.split("/");
      const actionType = pathArr[pathArr.length];
      return actionType === "create" ? "create" : "update";
    }
  },

  methods: {},

  validations() {
    return {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(50)
        },
        description: {
          minWords: minWords(3),
          maxWords: maxWords(500)
        }
      }
    };
  }
};
</script>
