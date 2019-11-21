<template>
  <main>
    <form-group
      v-if="inputType === 'text-field'"
      :name="fieldName"
      :attribute="`input.${fieldName}`"
    >
      <v-text-field
        slot-scope="{ attrs, listeners }"
        v-bind="attrs"
        v-model="model[fieldName]"
        outlined
        :label="$t(`input.${fieldName}`)"
        v-on="listeners"
      ></v-text-field>
    </form-group>
    <form-group
      v-if="inputType === 'textarea'"
      :name="fieldName"
      :attribute="`input.${fieldName}`"
    >
      <v-textarea
        rows="10"
        auto-grow
        slot-scope="{ attrs, listeners }"
        v-bind="attrs"
        v-model="model[fieldName]"
        outlined
        :label="$t(`input.${fieldName}`)"
        v-on="listeners"
      ></v-textarea>
    </form-group>
    <form-group
      v-if="inputType === 'select'"
      :name="fieldName"
      :attribute="`input.${fieldName}`"
    >
      <v-select
        slot-scope="{ attrs, listeners }"
        v-bind="attrs"
        v-model="model[fieldName]"
        :items="items"
        item-text="name"
        item-value="id"
        outlined
        :label="$t(`input.${fieldName}`)"
        v-on="listeners"
        :loading="loading"
      ></v-select>
    </form-group>
  </main>
</template>

<script>
export default {
  name: "TextField",
  props: {
    fieldName: {
      type: String
    },
    inputType: {
      type: String,
      default: "text-field"
    },
    model: {
      type: Object,
      default: () => {}
    },
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
