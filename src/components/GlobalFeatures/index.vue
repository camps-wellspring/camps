<template>
  <v-card>
    <v-card-title>{{ this.$t("label.features") }}</v-card-title>
    <v-divider></v-divider>

    <v-card-text class="py-2">
      <!-- Locale -->
      <v-row v-if="editMode" justify="center">
        <v-col cols="6">
          <locale-select @change="fireLocaleChange" />
        </v-col>
      </v-row>
      <!-- Locale -->

      <!-- Form -->
      <v-form @submit.prevent="save">
        <form-wrapper :validator="$v.feature">
          <v-row>
            <v-col cols="12">
              <form-group name="name">
                <template slot-scope="{ attrs }">
                  <v-textarea
                    :label="$t('label.name')"
                    v-model="feature.name"
                    v-bind="attrs"
                    outlined
                    @blur="$v.feature.name.$touch()"
                  >
                  </v-textarea>
                </template>
              </form-group>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-btn
                color="primary"
                large
                :loading="loading.save"
                :disabled="$v.$invalid"
                type="submit"
                >{{ $t("button.save") }}</v-btn
              >

              <v-btn
                v-if="editMode"
                color="secondary"
                class="mx-1"
                @click="reset"
                large
                >{{ $t("button.reset") }}</v-btn
              >
            </v-col>
          </v-row>
        </form-wrapper>
      </v-form>
      <!-- Form -->

      <!-- Table -->
      <v-data-table
        :headers="headers"
        :items="features"
        hide-default-footer
        :loading="tableLoading"
        :items-per-page="20"
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td>
              <!-- {{ item.name }} -->
              <read-more
                class="read-more"
                :text="item.name"
                :max-chars="20"
                less-str="read less"
              />
            </td>
            <td>
              <v-icon
                class="edit"
                small
                :title="$t('label.edit')"
                @click="handleEdit(item, index)"
                >mdi-pencil</v-icon
              >
              <v-icon
                class="delete"
                :title="$t('label.delete')"
                small
                @click="handleDelete(item, index)"
                >mdi-delete</v-icon
              >
            </td>
          </tr>
        </template>
      </v-data-table>
      <!-- Table -->
    </v-card-text>

    <v-divider class="mx-5"></v-divider>
    <v-card-actions class="py-4 mx-2">
      <v-spacer></v-spacer>
      <v-btn color="secondary" large @click="closeFeatures">{{
        $t("button.close")
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import {
  IndexData,
  ShowData,
  StoreData,
  UpdateData,
  DeleteData
} from "@/helpers/apiMethods";
import Cookies from "js-cookie";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "global-features",
  props: {
    FeaturedItemType: {
      type: String,
      default: "service"
    },
    FeaturedItemId: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.createTableHeaders();
    this.getFeatures();
  },
  data() {
    return {
      headers: [],
      features: [],
      editMode: false,
      feature: {
        name: ""
      },
      currentFeatureId: null,
      currentFeatureIndex: null,
      locale: Cookies.get("language"),

      tableLoading: true,
      loading: {
        save: false
      }
    };
  },
  methods: {
    getFeatures() {
      console.log("getting features");
      IndexData({
        reqName: `${this.FeaturedItemType}-features?${this.FeaturedItemType}_id=${this.FeaturedItemId}`
      })
        .then(res => {
          const { data } = res.data;
          this.features = [...data];
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    createTableHeaders() {
      const headersList = ["name", "actions"];
      this.headers = TableHeaders(headersList);
    },
    fireLocaleChange(locale) {
      this.locale = locale;
      this.getFeatureData();
    },
    handleEdit({ id }, index) {
      this.currentFeatureId = id;
      this.currentFeatureIndex = index;
      this.editMode = true;

      this.getFeatureData();
    },
    getFeatureData() {
      ShowData({
        reqName: `${this.FeaturedItemType}-features`,
        id: this.currentFeatureId,
        locale: this.locale
      })
        .then(res => {
          this.feature.name = res.data[`${this.FeaturedItemType}_feature`].name;
        })
        .catch(err => {
          console.log(err);
        });
    },
    save() {
      this.loading.save = true;

      // handle requests
      if (!this.editMode) {
        this.StoreFeature();
      } else {
        this.UpdateFeature();
      }
    },
    StoreFeature() {
      // set the request data
      let data = { ...this.feature };
      data[`${this.FeaturedItemType}_id`] = this.FeaturedItemId;

      // Create Feature
      StoreData({
        reqName: `${this.FeaturedItemType}-features`,
        data: data
      })
        .then(res => {
          this.loading.save = false;
          console.log("store", res);
          this.features.push(res.data[`${this.FeaturedItemType}_feature`]);
          this.reset();
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },
    UpdateFeature() {
      // Edit Feature
      UpdateData({
        reqName: `${this.FeaturedItemType}-features`,
        id: this.currentFeatureId,
        data: { ...this.feature, locale: this.locale, _method: "PUT" }
      })
        .then(res => {
          const itemData = res.data[`${this.FeaturedItemType}_feature`];
          this.$set(this.features, this.currentFeatureIndex, itemData);

          this.loading.save = false;
          this.reset();
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },
    handleDelete({ id }, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: `${this.FeaturedItemType}-features`, id: id })
            .then(() => {
              this.features.splice(index, 1);
            })
            .catch(err => console.log(err));
        }
      });
    },
    reset() {
      this.$v.$reset();
      this.feature = { name: "" };
      this.editMode = false;
      this.locale = Cookies.get("language");
    },
    closeFeatures() {
      this.$emit("closeFeatures");
    }
  },
  validations() {
    return {
      feature: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(5000)
        }
      }
    };
  }
};
</script>
