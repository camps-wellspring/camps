<template>
  <main>
    <!-- Toolbar -->
    <global-toolbar
      title="time_ranges"
      :actionButton="true"
      @ButtonClicked="showTimesDialog = true"
    />
    <!-- Toolbar -->

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="times"
      hide-default-footer
      :loading="tableLoading"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ item.text }} {{ $t("label.months") }}</td>
          <!-- <td>{{ item.min }}</td> -->
          <td class="toggle-adjust">
            <toggle-service
              :is-edit="true"
              model-name="time-ranges"
              :model-id="item.id"
              field="project_available"
              v-model="item.is_project_available"
              :validate="true"
            />
          </td>
          <td class="toggle-adjust">
            <toggle-service
              :is-edit="true"
              model-name="time-ranges"
              :model-id="item.id"
              field="service_available"
              v-model="item.is_service_available"
              :validate="true"
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

    <!-- Dialog -->
    <v-dialog v-model="showTimesDialog" max-width="700px">
      <v-card>
        <v-card-title>{{
          editMode ? this.$t("label.edit_times") : this.$t("label.create_times")
        }}</v-card-title>
        <v-divider></v-divider>

        <v-card-text class="py-3">
          <!-- Form -->
          <v-form v-if="showTimesDialog">
            <form-wrapper :validator="$v.time">
              <v-row>
                <v-col cols="12" v-if="!editMode">
                  <v-chip
                    v-for="(sTime, index) in selectedTimes"
                    :key="index"
                    class="ma-2"
                    close
                    @click:close="selectedTimes.splice(index, 1)"
                  >
                    {{ sTime }}
                  </v-chip>
                </v-col>

                <v-col :md="editMode ? 12 : 10" cols="12">
                  <form-group name="min">
                    <template slot-scope="{ attrs }">
                      <v-text-field
                        :label="$t('label.minimum')"
                        type="number"
                        v-model="time.min"
                        v-bind="attrs"
                        outlined
                        @blur="$v.time.min.$touch()"
                      >
                      </v-text-field>
                    </template>
                  </form-group>
                </v-col>

                <v-col v-if="!editMode" md="2" cols="12" class="text-end">
                  <v-btn
                    color="primary"
                    :disabled="$v.$invalid"
                    @click="addTime"
                    x-large
                  >
                    {{ $t("label.add") }}
                  </v-btn>
                </v-col>
              </v-row>
            </form-wrapper>
          </v-form>
          <!-- Form -->
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
        <v-card-actions class="py-4 mx-2">
          <v-spacer></v-spacer>

          <v-btn color="secondary" @click="closeTimesDialog">{{
            this.$t("button.cancel")
          }}</v-btn>
          <v-btn
            color="primary"
            :loading="loading.save"
            :disabled="saveValidation"
            @click="save"
            >{{ this.$t("button.save") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog -->
  </main>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { required, minValue, maxValue } from "vuelidate/lib/validators";
import {
  IndexData,
  ShowData,
  StoreData,
  UpdateData,
  DeleteData
} from "@/helpers/apiMethods";
import Cookies from "js-cookie";

export default {
  name: "time_ranges",

  data() {
    return {
      headers: [],
      times: [],
      tableLoading: true,

      time: {
        min: null
      },
      selectedTimes: [],

      currentTimeId: null,
      currentTimeIndex: null,
      editMode: false,

      showTimesDialog: false,
      loading: {
        save: false
      }
    };
  },
  computed: {
    saveValidation() {
      return (
        (!this.editMode && this.selectedTimes.length === 0) ||
        (this.editMode && this.$v.$invalid)
      );
    }
  },
  mounted() {
    this.createTableHeaders();
    this.getTimes();
  },
  methods: {
    createTableHeaders() {
      const headersList = [
        "range",
        // "Minimum",
        "project_available",
        "service_available",
        "actions"
      ];
      this.headers = TableHeaders(headersList);
    },
    getTimes() {
      IndexData({
        reqName: "time-ranges"
      })
        .then(res => {
          const { data } = res.data;
          this.times = data;

          // to remove the more
          this.times.pop();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleEdit({ id }, index) {
      this.currentTimeId = id;
      this.currentTimeIndex = index;
      this.editMode = true;
      this.showTimesDialog = true;

      this.getTimeData();
    },
    getTimeData() {
      ShowData({
        reqName: "time-ranges",
        id: this.currentTimeId,
        locale: Cookies.get("language")
      })
        .then(res => {
          const { time_range } = res.data;
          this.time.min = time_range.min;
        })
        .catch(err => {
          console.log(err);
        });
    },

    addTime() {
      if (!this.selectedTimes.includes(this.time.min)) {
        this.selectedTimes.push(this.time.min);
      }
      this.time.min = null;
      this.$v.$reset();
    },
    save() {
      this.loading.save = true;

      // handle requests
      if (!this.editMode) {
        this.StoreTime();
      } else {
        this.UpdateTime();
      }
    },
    StoreTime() {
      // set the request data
      let formData = new FormData();
      this.selectedTimes.forEach(sTime => {
        formData.append(`times[${sTime}]`, sTime * 1);
      });

      // Create Time
      StoreData({
        reqName: "time-ranges",
        data: formData
      })
        .then(() => {
          this.loading.save = false;
          this.getTimes();
          this.closeTimesDialog();
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },
    UpdateTime() {
      // Edit Time
      let formData = new FormData();
      formData.append("min", this.time.min);
      formData.append("_method", "PUT");
      formData.append("locale", Cookies.get("language"));

      UpdateData({
        reqName: "time-ranges",
        id: this.currentTimeId,
        data: formData
      })
        .then(res => {
          this.times.splice(this.currentTimeIndex, 1, res.data.time_range);

          this.loading.save = false;
          this.getTimes();
          this.closeTimesDialog();
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },

    handleDelete({ id }, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: "time-ranges", id: id })
            .then(() => {
              this.times.splice(index, 1);
              this.getTimes();
            })
            .catch(err => console.log(err));
        }
      });
    },

    closeTimesDialog() {
      this.showTimesDialog = false;
      this.resetTimes();
    },
    resetTimes() {
      this.$v.$reset();
      this.selectedTimes = [];
      this.time = {
        min: null
      };

      this.currentTimeId = null;
      this.currentTimeIndex = null;
      this.editMode = false;
    }
  },
  validations() {
    return {
      time: {
        min: {
          required,
          minValue: minValue(1),
          maxValue: maxValue(100000)
        }
      }
    };
  }
};
</script>
