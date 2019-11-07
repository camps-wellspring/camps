<template>
  <div class="technologies">
    <v-container>
      <global-toolbar title="Technologies" actions-type="filter" filter-mode />

      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        :loading="loading.table"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>
              <v-avatar class="square">
                <img :src="item.icon.path" :alt="item.icon.description"
              /></v-avatar>
            </td>
            <td>{{ item.url }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import generateTableHeaders from "@/helpers/TableHeaders";
import { IndexData } from "@/helpers/apiMethods";

export default {
  name: "Technologies",
  data() {
    return {
      headerValues: ["name", "logo", "url", "actions"],
      items: [],
      loading: {
        table: false
      }
    };
  },

  computed: {
    headers() {
      return generateTableHeaders(this.headerValues);
    }
  },

  created() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      this.loading.table = true;
      IndexData({ reqName: "technologies" }).then(res => {
        this.items = res.data.data;
        this.loading.table = false;
      });
    }
  }
};
</script>
