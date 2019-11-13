<template>
  <v-card class="pa-0">
    <v-card-title>main Info</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <form-group name="name">
            <template slot-scope="{ attrs }">
              <v-text-field
                v-bind="attrs"
                v-model="form.name"
                outlined
                :label="$t('label.name')"
                @input="hadleChange('name')"
              ></v-text-field>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6">
          <form-group name="priority">
            <template slot-scope="{ attrs }">
              <v-text-field
                v-bind="attrs"
                v-model="form.priority"
                outlined
                :label="$t('label.priority')"
                @input="hadleChange('priority')"
              ></v-text-field>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12">
          <form-group name="description">
            <template slot-scope="{ attrs }">
              <v-textarea
                v-bind="attrs"
                v-model="form.description"
                outlined
                auto-grow
                row-height="40"
                :label="$t('label.description')"
                @input="hadleChange('description')"
              ></v-textarea>
            </template>
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
  },
  inject: ["hadleChange"]
};
</script>

<style lang="scss" scoped></style>
