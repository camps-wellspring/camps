<template>
  <main>
    <!-- Toolbar -->
    <global-toolbar
      title="budget_ranges"
      :actionButton="true"
      @ButtonClicked="showBudgetsDialog = true"
    />
    <!-- Toolbar -->

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="budgets"
      :mobile-breakpoint="0"
      :loading="tableLoading"
      hide-default-footer
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ item.text }} {{ $t("label.sar") }}</td>
          <!-- <td>{{ item.min }}</td> -->
          <td class="toggle-adjust">
            <toggle-service
              :is-edit="true"
              model-name="budget-ranges"
              :model-id="item.id"
              field="project_available"
              v-model="item.is_project_available"
              :validate="true"
            />
          </td>
          <td class="toggle-adjust">
            <toggle-service
              :is-edit="true"
              model-name="budget-ranges"
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
    <v-dialog v-model="showBudgetsDialog" max-width="700px">
      <v-card>
        <v-card-title>{{
          editMode
            ? this.$t("label.edit_budgets")
            : this.$t("label.create_budgets")
        }}</v-card-title>
        <v-divider></v-divider>

        <v-card-text class="py-3">
          <!-- Form -->
          <v-form v-if="showBudgetsDialog" @submit.prevent="addBudget">
            <form-wrapper :validator="$v.budget">
              <v-row>
                <v-col cols="12" v-if="!editMode">
                  <v-chip
                    v-for="(sBudget, index) in selectedBudgets"
                    :key="index"
                    class="ma-2"
                    close
                    @click:close="selectedBudgets.splice(index, 1)"
                  >
                    {{ sBudget }}
                  </v-chip>
                </v-col>

                <v-col :md="editMode ? 12 : 10" cols="12">
                  <form-group name="min">
                    <template slot-scope="{ attrs }">
                      <v-text-field
                        :label="$t('label.minimum')"
                        type="number"
                        v-model="budget.min"
                        v-bind="attrs"
                        outlined
                        @blur="$v.budget.min.$touch()"
                      >
                      </v-text-field>
                    </template>
                  </form-group>
                </v-col>

                <v-col v-if="!editMode" md="2" cols="12" class="text-end">
                  <v-btn
                    color="primary"
                    :disabled="$v.$invalid"
                    type="submit"
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

          <v-btn color="secondary" @click="closeBudgetsDialog">{{
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
import { required, minValue } from "vuelidate/lib/validators";
import {
  IndexData,
  ShowData,
  StoreData,
  UpdateData,
  DeleteData
} from "@/helpers/apiMethods";
import Cookies from "js-cookie";

export default {
  name: "budget_ranges",

  data() {
    return {
      headers: [],
      budgets: [],
      tableLoading: true,

      budget: {
        min: null
      },
      selectedBudgets: [],

      currentBudgetId: null,
      currentBudgetIndex: null,
      editMode: false,

      showBudgetsDialog: false,
      loading: {
        save: false
      }
    };
  },
  computed: {
    saveValidation() {
      return (
        (!this.editMode && this.selectedBudgets.length === 0) ||
        (this.editMode && this.$v.$invalid)
      );
    }
  },
  mounted() {
    this.createTableHeaders();
    this.getBudgets();
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
    getBudgets() {
      IndexData({
        reqName: "budget-ranges"
      })
        .then(res => {
          const { data } = res.data;
          this.budgets = data;

          // to remove the more
          this.budgets.pop();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleEdit({ id }, index) {
      this.currentBudgetId = id;
      this.currentBudgetIndex = index;
      this.editMode = true;
      this.showBudgetsDialog = true;

      this.getBudgetData();
    },
    getBudgetData() {
      ShowData({
        reqName: "budget-ranges",
        id: this.currentBudgetId,
        locale: Cookies.get("language")
      })
        .then(res => {
          const { budget_range } = res.data;
          this.budget.min = budget_range.min;
        })
        .catch(err => {
          console.log(err);
        });
    },

    addBudget() {
      if (!this.selectedBudgets.includes(this.budget.min)) {
        this.selectedBudgets.push(this.budget.min);
      }
      this.budget.min = null;
      this.$v.$reset();
    },
    save() {
      this.loading.save = true;

      // handle requests
      if (!this.editMode) {
        this.StoreBudget();
      } else {
        this.UpdateBudget();
      }
    },
    StoreBudget() {
      // set the request data
      let formData = new FormData();
      this.selectedBudgets.forEach(sBudget => {
        formData.append(`ranges[${sBudget}]`, sBudget * 1);
      });

      // Create Budget
      StoreData({
        reqName: "budget-ranges",
        data: formData
      })
        .then(() => {
          this.loading.save = false;
          this.getBudgets();
          this.closeBudgetsDialog();
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },
    UpdateBudget() {
      // Edit Budget
      let formData = new FormData();
      formData.append("min", this.budget.min);
      formData.append("_method", "PUT");
      formData.append("locale", Cookies.get("language"));

      UpdateData({
        reqName: "budget-ranges",
        id: this.currentBudgetId,
        data: formData
      })
        .then(res => {
          this.budgets.splice(
            this.currentBudgetIndex,
            1,
            res.data.budget_range
          );

          this.loading.save = false;
          this.getBudgets();
          this.closeBudgetsDialog();
        })
        .catch(err => {
          console.log(err);
          this.loading.save = false;
        });
    },

    handleDelete({ id }, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: "budget-ranges", id: id })
            .then(() => {
              this.budgets.splice(index, 1);
              this.getBudgets();
            })
            .catch(err => console.log(err));
        }
      });
    },

    closeBudgetsDialog() {
      this.showBudgetsDialog = false;
      this.resetBudgets();
    },
    resetBudgets() {
      this.$v.$reset();
      this.selectedBudgets = [];
      this.budget = {
        min: null
      };

      this.currentBudgetId = null;
      this.currentBudgetIndex = null;
      this.editMode = false;
    }
  },
  validations() {
    return {
      budget: {
        min: {
          required,
          minValue: minValue(1)
        }
      }
    };
  }
};
</script>
