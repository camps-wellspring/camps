<template>
  <main>
    <!-- table -->
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      :items-per-page="20"
      :loading="tableLoading"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <slot :item="item" :index="index"></slot>
        </tr>
      </template>
    </v-data-table>
    <!-- table -->
    <!-- pagination -->
    <div class="text-xs-center mt-4">
      <v-pagination
        v-if="items.length > 0 && pagination.last_page > 1"
        v-model="pagination.current_page"
        :length="pagination.last_page"
        :total-visible="10"
        @input="handlePagination"
      ></v-pagination>
    </div>
    <!-- pagination -->
  </main>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";
import { IndexData, DeleteData } from "@/helpers/apiMethods";
import { isEqual } from "lodash";

export default {
  name: "WrappingTable",
  props: {
    pathName: {
      type: String,
      required: true
    },
    headersName: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      items: [],
      headers: [],
      tableLoading: true,
      pagination: {},
      queries: {}
    };
  },
  mounted() {
    this.createTableHeaders();
  },
  methods: {
    createTableHeaders() {
      this.headers = TableHeaders(this.headersName);
    },
    handleGetItems() {
      IndexData({ reqName: this.pathName })
        .then(res => {
          this.tableLoading = false;
          const { data, meta } = res.data;
          this.items = data;

          this.pagination = meta;
        })
        .catch(err => console.log(err));
    },
    handlePagination(page) {
      this.queries = { ...this.queries, page };
      if (!isEqual(this.queries, this.$route.query)) {
        this.$router.push({ query: this.queries });
      }
    },
    handleDelete(param, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          DeleteData({ reqName: this.pathName, id: param })
            .then(() => {
              this.$delete(this.items, index);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    handleUpdateItems(data, index) {
      this.$set(this.items, index, data);
    }
  },
  watch: {
    $route: {
      handler({ query }) {
        this.queries = query;
        this.handleGetItems(this.queries);
      },
      immediate: true
    }
  }
};
</script>
