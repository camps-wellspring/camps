<template>
  <v-card>
    <v-card-title>{{ $t("heading.platforms") }}</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6">
            <form-group name="id" :validator="$v.platform.id">
              <template slot-scope="{ attrs }">
                <v-select
                  v-bind="attrs"
                  outlined
                  :label="$t('label.platform')"
                  :items="platforms"
                  item-text="name"
                  return-object
                  @input="handleItemChoose"
                  @change="$v.platform.id.$touch()"
                  ref="platformSelect"
                />
              </template>
            </form-group>
          </v-col>

          <v-col cols="12" md="6">
            <form-group name="url" :validator="$v.platform.url">
              <template slot-scope="{ attrs }">
                <v-text-field
                  v-model="platform.url"
                  v-bind="attrs"
                  outlined
                  :label="$t('label.platform_url')"
                  @blur="$v.platform.url.$touch()"
                ></v-text-field>
              </template>
            </form-group>
          </v-col>

          <v-col md="6">
            <v-card-actions>
              <v-btn
                block
                :disabled="$v.platform.$invalid"
                @click="handleAddItem"
                class="primary"
                large
                >{{ $t("button.add") }}</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>

        <v-card-text v-if="addedPlatforms && addedPlatforms.length > 0">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-simple-table class="pt-0">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>{{ $t("table.name") }}</th>
                        <th>{{ $t("table.url") }}</th>
                        <th>{{ $t("table.delete") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in addedPlatforms" :key="item.id">
                        <td>
                          <read-more
                            class="read-more"
                            :text="item.name || '---'"
                            :max-chars="20"
                            less-str="read less"
                          />
                        </td>
                        <td>
                          <read-more
                            class="read-more"
                            :text="item.url || '---'"
                            :max-chars="50"
                            less-str="read less"
                          />
                        </td>
                        <td>
                          <v-btn icon>
                            <v-icon medium title="delete" @click="handleItemDelete(item, i)"
                              >mdi-delete</v-icon
                            >
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { required, url } from "vuelidate/lib/validators";

export default {
  props: {
    platforms: {
      type: Array,
      default: () => []
    },
    addedPlatforms: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      platform: {
        id: null,
        url: ""
      }
    };
  },

  validations() {
    return {
      platform: {
        id: {
          required
        },
        url: {
          required,
          url
        }
      }
    };
  },

  methods: {
    handleItemChoose(platformItem) {
      Object.assign(this.platform, platformItem);
    },

    // TODO emit an empty item instead
    handleItemDelete(item, i) {
      this.$emit("DeletePlatform", item, i, "platforms", "platforms");
      this.$refs.platformSelect.reset();
    },

    handleAddItem() {
      this.$emit("AddPlatform", this.platform, "platforms", "platforms");
      this.platform = {
        id: null,
        url: "",
        name: ""
      };
      this.$v.platform.$reset();
    }
  }
};
</script>
