<template>
  <v-container>
    <locale-select
      v-if="actionType === 'update'"
      :loading="loading.fetch"
      @change="handleLocaleChange"
    />

    <form-wrapper :validator="$v.form">
      <form @submit.prevent="onSubmit">
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
            <div class="d-flex align-center">
              <span class="color-label">{{ $t("label.color") }}:</span>
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ on }">
                  <v-btn class="color-button" x-large depressed :color="form.color" v-on="on" />
                </template>
                <v-color-picker
                  :value="form.color"
                  @update:color="form.color = $event.hex"
                  mode="hexa"
                  hide-mode-switch
                  @input="$v.form.color.$touch()"
                />
              </v-menu>
            </div>
          </v-col>

          <v-col cols="12" md="6">
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
          </v-col>

          <v-col cols="12">
            <v-btn
              type="submit"
              class="primary"
              :disabled="$v.form.$invalid"
              :loading="loading.submit"
              >{{ $t("button.submit") }}</v-btn
            >
          </v-col>
        </v-row>
      </form>
    </form-wrapper>
  </v-container>
</template>

<script>
import { minLength, maxLength, required, requiredIf } from "vuelidate/lib/validators";
import actionMixin from "@/mixins/actionMixin";

export default {
  name: "Platforms",

  mixins: [actionMixin],

  data() {
    return {
      config: {
        modelName: "platforms",
        imgType: "icon"
      },
      form: {}
    };
  },

  validations() {
    return {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(20)
        },
        color: {
          required: requiredIf(() => this.actionType === "create")
        },
        [this.config.imgType]: {
          required: requiredIf(() => this.actionType === "create")
        }
      }
    };
  }
};
</script>
