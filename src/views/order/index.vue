<template>
  <main>
    <!-- Toolbar -->
    <global-toolbar title="orders" />
    <!-- Toolbar -->

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="orders"
      hide-default-footer
      :loading="tableLoading"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ item.user_name }}</td>
          <td>{{ item.user_email }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.order_data_name }}</td>
          <td>
            <v-chip
              v-if="item.seen"
              class="ma-2"
              color="green"
              text-color="white"
            >
              {{ item.seen.date.split(" ")[0] }}
            </v-chip>
            <v-chip v-else class="ma-2" color="red" text-color="white">
              {{ $t("label.no") }}
            </v-chip>
          </td>
          <td>
            <v-chip
              v-if="item.closed"
              class="ma-2"
              color="green"
              text-color="white"
            >
              {{ item.closed.date.split(" ")[0] }}
            </v-chip>
            <v-chip v-else class="ma-2" color="red" text-color="white">
              {{ $t("label.no") }}
            </v-chip>
          </td>
          <td>
            <v-icon
              v-if="item.closed"
              :title="$t('label.open_order')"
              @click="handleCloseOrder(item)"
              >mdi-close-outline</v-icon
            >
            <v-icon
              v-else
              :title="$t('label.close_order')"
              @click="handleCloseOrder(item)"
              >mdi-check-outline</v-icon
            >
          </td>
          <td>
            <v-icon
              class="mx-1"
              small
              :title="$t('label.show')"
              @click="handleShow(item)"
              >mdi-eye</v-icon
            >
            <v-icon
              small
              :title="$t('label.delete')"
              @click="handleDelete(item, index)"
              >mdi-delete</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- Table -->

    <!-- Dialog -->
    <v-dialog v-model="showOrderDialog" max-width="700px">
      <v-card>
        <v-card-title>{{ this.$t("label.order_details") }}</v-card-title>
        <v-divider></v-divider>

        <v-card-text class="py-3" v-if="order.id">
          <!-- Locale -->
          <v-row justify="center">
            <v-col cols="6">
              <locale-select @change="fireLocaleChange" />
            </v-col>
          </v-row>
          <!-- Locale -->

          <!-- order Data -->
          <v-row v-for="(userInfo, index) in orderUserInfo" :key="index">
            <v-col md="6" cols="12"> {{ $t(`label.${userInfo.key}`) }}: </v-col>

            <v-col
              v-if="
                (userInfo.key === 'user_phone' && !userInfo.data.empty) ||
                  userInfo.key !== 'user_phone'
              "
              md="6"
              cols="12"
            >
              {{
                userInfo.key === "user_phone"
                  ? userInfo.data.country_code + " / " + userInfo.data.phone
                  : userInfo.data
              }}
            </v-col>
          </v-row>
          <!-- Order Data -->
        </v-card-text>
        <v-card-text class="py-3 text-center" v-else>
          <v-progress-circular
            :size="100"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
        <v-card-actions class="py-4 mx-2">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeOrderDialog">{{
            this.$t("button.close")
          }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog -->
  </main>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
// import { required, minLength, maxLength } from "vuelidate/lib/validators";
import {
  IndexData,
  ShowData,
  UpdateData,
  DeleteData
} from "@/helpers/apiMethods";
import Cookies from "js-cookie";

export default {
  name: "order",

  data() {
    return {
      headers: [],
      orders: [],
      tableLoading: true,

      order: {},
      orderUserInfo: [],
      orderInfo: [],
      orderStatusInfo: [],

      currentOrderId: null,
      showOrderDialog: false,
      locale: Cookies.get("language")
    };
  },
  mounted() {
    this.createTableHeaders();
    this.getOrders();
  },
  methods: {
    createTableHeaders() {
      const headersList = [
        "user_name",
        "user_email",
        "type",
        "order_data_name",
        "seen",
        "closed",
        "handle_close",
        "actions"
      ];
      this.headers = TableHeaders(headersList);
    },
    getOrders() {
      IndexData({ reqName: `orders` })
        .then(res => {
          const { data } = res.data;
          this.orders = data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleShow({ id }) {
      this.currentOrderId = id;
      this.showOrderDialog = true;

      this.getOrderData();
    },
    fireLocaleChange(locale) {
      this.locale = locale;
      this.orderUserInfo = [];
      this.orderInfo = [];
      this.orderStatusInfo = [];
      this.getOrderData();
    },
    getOrderData() {
      ShowData({
        reqName: "orders",
        id: this.currentOrderId,
        locale: this.locale
      })
        .then(res => {
          const { order } = res.data;
          this.order = { ...order };
          this.handleShowOrderStructure();
        })
        .catch(err => {
          this.closeOrderDialog();
          console.log(err);
        });
    },

    handleShowOrderStructure() {
      this.orderUserInfo = [];
      this.orderInfo = [];
      this.orderStatusInfo = [];

      // User Info
      this.orderUserInfo.push(
        { key: "user_name", data: this.order.user_name },
        { key: "user_email", data: this.order.user_email },
        {
          key: "user_phone",
          data: this.order.user_phone
            ? { ...this.order.user_phone }
            : { empty: true }
        }
      );

      this.orderUserInfo.forEach(info => {
        delete this.order[info.key];
      });

      // Status Info
      this.orderStatusInfo.push(
        { key: "seen", data: { ...this.order.seen } },
        { key: "closed", data: { ...this.order.closed } }
      );

      this.orderStatusInfo.forEach(info => {
        delete this.order[info.key];
      });

      // delete non important
      delete this.order.order_data;

      Object.keys(this.order).forEach(key => {
        this.orderInfo.push({ key: key, data: { ...this.order[key] } });
      });
    },

    handleCloseOrder({ id, closed }) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          let formData = new FormData();

          // standards
          let isClosed = closed ? "yes" : "no";
          formData.append("closed", isClosed);
          formData.append("_method", "PUT");
          formData.append("locale", this.locale);

          UpdateData({ reqName: "orders", id: id, data: formData })
            .then(() => {
              this.getOrders();
            })
            .catch(err => console.log(err));
        }
      });
    },

    handleDelete({ id }, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: "orders", id: id })
            .then(() => {
              this.orders.splice(index, 1);
            })
            .catch(err => console.log(err));
        }
      });
    },

    closeOrderDialog() {
      this.showOrderDialog = false;
      this.resetOrder();
    },
    resetOrder() {
      this.order = {};
      this.orderUserInfo = [];
      this.orderInfo = [];
      this.orderStatusInfo = [];

      this.locale = Cookies.get("language");
      this.currentOrderId = null;
    }
  }
};
</script>
