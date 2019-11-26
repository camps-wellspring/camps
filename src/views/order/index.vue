<template>
  <main>
    <!-- Toolbar -->
    <global-toolbar title="orders" />
    <!-- Toolbar -->

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="20"
      :mobile-breakpoint="0"
      :loading="tableLoading"
      hide-default-footer
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
              >mdi-lock</v-icon
            >
            <v-icon
              v-else
              :title="$t('label.close_order')"
              @click="handleCloseOrder(item)"
              >mdi-lock-open-variant</v-icon
            >
          </td>
          <td>
            <v-icon :title="$t('label.show')" @click="handleShow(item)"
              >mdi-eye</v-icon
            >
            <v-icon
              class="mx-1"
              :title="$t('label.delete')"
              @click="handleDelete(item, index)"
              >mdi-delete</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- Table -->

    <!-- pagination -->
    <div class="text-xs-center pt-2">
      <v-pagination
        v-if="orders.length > 0 && pagination.last_page > 1"
        v-model="pagination.current_page"
        :length="pagination.last_page"
        :total-visible="20"
        @input="handlePagination"
      ></v-pagination>
    </div>
    <!-- pagination -->

    <!-- Dialog -->
    <v-dialog v-model="showOrderDialog" max-width="700px">
      <v-card>
        <v-card-title>{{ this.$t("label.order_details") }}</v-card-title>
        <v-divider></v-divider>

        <v-card-text class="py-3 height-90" v-if="order.id">
          <!-- Locale -->
          <!-- <v-row justify="center">
            <v-col cols="6">
              <locale-select @change="fireLocaleChange" />
            </v-col>
          </v-row> -->
          <!-- Locale -->

          <!-- Order Data -->
          <h3 class="mt-3">{{ $t("label.order_info") }}</h3>
          <v-divider></v-divider>
          <v-row v-for="(orderInfo, i) in orderInfo" :key="i + 6">
            <v-col v-if="orderInfo.data" md="6" cols="12">
              <h4>{{ $t(`label.${orderInfo.key}`) }} :</h4>
            </v-col>

            <v-col v-if="orderInfo.data" md="6" cols="12">
              {{ orderInfo.data }}
            </v-col>
          </v-row>

          <!-- Attachments -->
          <v-row v-if="order.attachments.length">
            <v-col md="6" cols="12">
              <h4>{{ $t("label.attachments") }} :</h4>
            </v-col>

            <v-col md="6" cols="12">
              <v-icon medium title="attachment" @click="showAttachments(order)"
                >mdi-attachment</v-icon
              >
            </v-col>
          </v-row>
          <!-- Attachments -->
          <!-- Order Data -->

          <!-- Order Status Data -->
          <h3 class="mt-3">{{ $t("label.status_info") }}</h3>
          <v-divider></v-divider>
          <v-row v-for="(statusInfo, i) in orderStatusInfo" :key="i">
            <v-col md="6" cols="12">
              <h4>{{ $t(`label.${statusInfo.key}`) }} :</h4>
            </v-col>

            <v-col md="6" cols="12">
              {{
                statusInfo.data.empty
                  ? $t("label.no")
                  : statusInfo.data.date.split(" ")[0]
              }}
            </v-col>
          </v-row>
          <!-- Order Status Data -->

          <!-- Order User Data -->
          <h3 class="mt-3">{{ $t("label.user_info") }}</h3>
          <v-divider></v-divider>
          <v-row v-for="(userInfo, index) in orderUserInfo" :key="index + 3">
            <v-col md="6" cols="12">
              <h4>{{ $t(`label.${userInfo.key}`) }} :</h4>
            </v-col>

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
          <!-- Order User Data -->
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

    <!-- AttachmentsDialog -->
    <DialogComponent v-model="attachmentsDialog">
      <template #heading>
        <v-card-title>{{ $t("heading.attachments") }}</v-card-title>
      </template>
      <template #body>
        <v-row>
          <v-col cols="12" md="3" v-for="photo in photos" :key="photo.id">
            <v-img
              title="photo"
              fluid
              aspect-ratio="1"
              :src="photo && photo.path"
            ></v-img>
          </v-col>
          <v-col cols="12" md="3" v-for="file in pdfFiles" :key="file.id">
            <a :href="file.path" target="_blank">
              <v-img
                title="pdf"
                fluid
                aspect-ratio="1"
                :src="require('@/assets/imgs/pdf-icon.png')"
              ></v-img>
            </a>
          </v-col>
        </v-row>
      </template>
    </DialogComponent>
    <!-- AttachmentsDialog -->
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

      photos: [],
      pdfFiles: [],

      currentOrderId: null,
      showOrderDialog: false,
      attachmentsDialog: false,
      locale: Cookies.get("language"),

      pagination: {},
      queries: {}
    };
  },
  mounted() {
    this.createTableHeaders();
    // this.getOrders();
  },
  watch: {
    $route: {
      handler(route) {
        this.queries = {
          ...route.query
        };
        this.getOrders();
      },
      immediate: true
    },
    attachmentsDialog: {
      handler(value) {
        if (!value) {
          this.photos = [];
          this.pdfFiles = [];
        }
      },
      immediate: true
    },
    showOrderDialog: {
      handler(value) {
        if (!value) {
          this.getOrders();
        }
      }
    }
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
      IndexData({ reqName: `orders`, query: this.queries })
        .then(res => {
          const { data, meta } = res.data;
          this.orders = data;
          this.pagination = meta;
          console.log("test meta", meta);
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
    // fireLocaleChange(locale) {
    //   this.locale = locale;
    //   this.order = {};
    //   this.resetOrderArrays();
    //   this.getOrderData();
    // },
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
      this.resetOrderArrays();

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
        {
          key: "seen",
          data: this.order.seen ? { ...this.order.seen } : { empty: true }
        },
        {
          key: "closed",
          data: this.order.closed ? { ...this.order.closed } : { empty: true }
        }
      );

      this.orderStatusInfo.forEach(info => {
        delete this.order[info.key];
      });

      // delete non important
      delete this.order.order_data;

      Object.keys(this.order).forEach(key => {
        if (key === "extra_services") {
          let extraS = "";
          this.order[key].forEach(extra => {
            extraS += extra.name + " - ";
          });
          extraS = extraS.slice(0, -2);
          this.orderInfo.push({ key: key, data: extraS });
        } else if (key != "id" && key != "attachments") {
          this.orderInfo.push({ key: key, data: this.order[key] });
        }
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

    showAttachments({ attachments }) {
      this.closeOrderDialog();
      this.attachmentsDialog = true;

      attachments.map(el => {
        if (el.type === "photo") {
          this.photos.push(el);
        } else if (el.type === "file") {
          this.pdfFiles.push(el);
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

    handlePagination(value) {
      this.queries.page = value;
      this.$router.push({ query: this.queries });
    },
    closeOrderDialog() {
      this.showOrderDialog = false;
      this.resetOrder();
    },
    resetOrder() {
      this.order = {};
      this.resetOrderArrays();

      this.locale = Cookies.get("language");
      this.currentOrderId = null;
    },
    resetOrderArrays() {
      this.orderUserInfo = [];
      this.orderInfo = [];
      this.orderStatusInfo = [];
    }
  }
};
</script>
