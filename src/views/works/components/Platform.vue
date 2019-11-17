<template>
  <v-card>
    <v-card-title>Platforms</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col md="4">
              <form-group name="platforms_ids">
                <v-select
                  slot-scope="{ attrs, listeners }"
                  v-bind="attrs"
                  :items="items"
                  item-text="name"
                  item-value="id"
                  outlined
                  v-model="form.platforms_ids"
                  :loading="selectLoading"
                  :label="$t('label.platforms')"
                  v-on="listeners"
                ></v-select>
              </form-group>
            </v-col>
            <v-col md="6">
              <form-group name="work_url" attribute="label.url">
                <v-text-field
                  slot-scope="{ attrs, listeners }"
                  v-bind="attrs"
                  v-model="form.work_url"
                  outlined
                  :label="$t('label.url')"
                  v-on="listeners"
                ></v-text-field>
              </form-group>
            </v-col>
            <v-col md="2">
              <v-btn
                @click="handleAddPlatforms"
                :disabled="handleValidPlatforms()"
                class="primary"
                large
                >{{ $t("button.add") }}</v-btn
              >
            </v-col>
          </v-row>
          <!-- table -->
          <transition name="fadeIn" mode="in-out">
            <v-data-table
              v-if="myPlatforms.length > 0"
              :headers="headers"
              :items="myPlatforms"
              hide-default-footer
              :items-per-page="20"
            >
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>{{ item.name }}</td>
                  <td>{{ item.url }}</td>
                  <td>
                    <v-icon
                      medium
                      title="delete"
                      @click="handleDeletePlatForm(item, index)"
                      >mdi-delete</v-icon
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
          </transition>

          <!-- table -->
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { IndexData } from "@/helpers/apiMethods";
export default {
  name: "Platform",
  props: {
    form: {
      type: Object,
      required: true
    },
    myPlatforms: {
      type: Array,
      required: true
    }
  },
  inject: ["$v"],
  data() {
    return {
      items: [],
      headers: [],
      selectLoading: true
    };
  },
  mounted() {
    this.handleGetPlatForms();
    this.createTableHeaders();
  },
  methods: {
    handleGetPlatForms() {
      IndexData({ reqName: "platforms" })
        .then(res => {
          const { data } = res.data;

          const dataPlatform = data.map(el => {
            return {
              id: el.id,
              name: el.name
            };
          });
          const platformsIds = [];
          this.myPlatforms.map(el => platformsIds.push(el.id));
          this.items = dataPlatform.filter(el => !platformsIds.includes(el.id));
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.selectLoading = false;
        });
    },
    createTableHeaders() {
      const headersList = ["name", "url", "configs"];
      this.headers = TableHeaders(headersList);
    },
    handleDeletePlatForm(item, index) {
      this.$delete(this.myPlatforms, index);
      this.items.unshift(item);
    },
    handleValidPlatforms() {
      return (
        this.$v.form.platforms_ids.$invalid || this.$v.form.work_url.$invalid
      );
    },
    handleAddPlatforms() {
      const { work_url, platforms_ids } = this.form;
      const platFormObject = this.items.filter(
        el => el.id === platforms_ids
      )[0];
      platFormObject.url = work_url;

      if (work_url !== "" && platforms_ids !== "") {
        this.myPlatforms.push(platFormObject);
      }
      this.form.work_url = "";
      this.form.platforms_ids = "";
      if (this.myPlatforms.includes(platFormObject)) {
        this.items = this.items.filter(el => el.id !== platFormObject.id);
      }
      this.$v.form.$reset();
    }
  }
};
</script>
