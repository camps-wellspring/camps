<template>
  <!-- <header v-if="items.length"> -->
  <v-breadcrumbs v-if="items.length" :items="items" class="breadcrumb-area">
    <template v-slot:item="props">
      <!-- <router-link to="/dashboard">Dashboard /</router-link> -->
      <router-link :to="props.item.href"> {{ props.item.text }}</router-link>
    </template>
    <!-- <template v-slot:divider>
        <v-icon>chevron_right</v-icon>
      </template> -->
  </v-breadcrumbs>
  <!-- </header> -->
</template>

<script>
export default {
  name: "currentPath",
  data() {
    return {
      items: []
    };
  },
  created() {
    this.handleCurrentPath();
  },
  methods: {
    handleCurrentPath() {
      var currentUrl = window.location.pathname;
      currentUrl = currentUrl.split("/");
      currentUrl.shift();
      // currentUrl = this.$t(`navigation.path.${currentUrl}`);

      let currentUrlLen = currentUrl.length;
      for (let i = 0; i < currentUrlLen; i++) {
        let currentTemp = currentUrl[i];
        currentUrl[i] = {
          text: this.$t(`navigation.path.${currentUrl[i].replace("-", " ")}`),
          disabled: false,
          href: ""
        };

        // handling href -------------------------
        for (let j = 0; j <= i; j++) {
          if (i === 0) {
            currentUrl[i].href = "/" + currentTemp;
            break;
          }
          if (i === j) {
            currentUrl[i].href += currentTemp;
            break;
          }
          currentUrl[i].href += currentUrl[j].href + "/";
        }
        // handling Disability -------------------
        if (i === currentUrlLen - 1) {
          currentUrl[i].disabled = true;
        }
      }
      this.items = [...currentUrl];
    }
  }
};
</script>
