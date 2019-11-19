<template>
  <v-card class="pa-0">
    <v-card-title>main Info</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <form-group name="name">
            <v-text-field
              slot-scope="{ attrs, listeners }"
              v-bind="attrs"
              v-model="form.name"
              outlined
              :label="$t('label.name')"
              v-on="listeners"
            ></v-text-field>
          </form-group>
        </v-col>
        <v-col cols="12" md="6">
          <form-group name="priority">
            <v-text-field
              slot-scope="{ attrs, listeners }"
              v-bind="attrs"
              v-model="form.priority"
              outlined
              :label="$t('label.priority')"
              v-on="listeners"
            ></v-text-field>
          </form-group>
        </v-col>
        <v-col cols="12">
          <form-group name="description">
            <v-textarea
              slot-scope="{ attrs, listeners }"
              v-bind="attrs"
              v-model="form.description"
              outlined
              auto-grow
              row-height="40"
              :label="$t('label.description')"
              v-on="listeners"
            ></v-textarea>
          </form-group>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// import action from "../action";
export default {
  name: "MainInfo",
  props: {
    form: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
