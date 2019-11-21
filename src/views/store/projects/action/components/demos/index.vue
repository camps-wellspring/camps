<template>
  <v-card>
    <v-card-title>{{ $t("heading.demo") }}</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <form-group name="id" :validator="$v.demo.id">
                <template slot-scope="{ attrs }">
                  <v-select
                    v-bind="attrs"
                    outlined
                    :label="$t('label.demo_type')"
                    :items="demoTypes"
                    item-text="name"
                    return-object
                    @input="handleItemChoose"
                    @change="$v.demo.id.$touch()"
                    ref="demoSelect"
                  />
                </template>
              </form-group>
            </v-col>

            <v-col cols="12" md="6">
              <form-group name="url" :validator="$v.demo.url">
                <template slot-scope="{ attrs }">
                  <v-text-field
                    v-model="demo.url"
                    v-bind="attrs"
                    outlined
                    :label="$t('label.demo_url')"
                    @blur="$v.demo.url.$touch()"
                  ></v-text-field>
                </template>
              </form-group>
            </v-col>

            <v-col cols="12" md="6">
              <new-image-upload
                class="file-upload__image"
                :imgUrl="demo.screen && demo.screen.path"
                :imgId="demo.screen && demo.screen.id"
                :reset="!demo.screen"
                :max-size="2"
                @fileSelected="demo.screen = $event.file"
              />
            </v-col>

            <v-col sm="3" class="d-flex justify-center">
              <v-switch hide-details v-model="demo.visible" :label="$t('label.visible')" />
            </v-col>

            <v-col sm="3">
              <v-card-actions>
                <v-btn
                  block
                  :disabled="$v.demo.$invalid"
                  @click="handleAddItem"
                  class="primary"
                  large
                  >{{ $t("button.add") }}</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
        </v-form>

        <v-card-text v-if="addedDemos.length > 0">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>{{ $t("table.name") }}</th>
                        <th>{{ $t("table.url") }}</th>
                        <th>{{ $t("table.visible") }}</th>
                        <th>{{ $t("table.screen") }}</th>
                        <th>{{ $t("table.delete") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in addedDemos" :key="item.id">
                        <td>
                          <read-more
                            class="read-more"
                            :text="item.name"
                            :max-chars="20"
                            less-str="read less"
                          />
                        </td>
                        <td>
                          <read-more
                            class="read-more"
                            :text="item.url"
                            :max-chars="50"
                            less-str="read less"
                          />
                        </td>
                        <td>
                          <v-avatar>
                            <img
                              @click="handleImgPreview(screenPath(item.screen))"
                              :src="screenPath(item.screen)"
                            />
                          </v-avatar>
                        </td>
                        <td>
                          <v-switch hide-details v-model="item.visible" />
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
    demoTypes: {
      type: Array,
      default: () => []
    },
    addedDemos: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      demo: {
        id: null,
        url: "",
        visible: true,
        screen: null
      }
    };
  },

  validations() {
    return {
      demo: {
        id: {
          required
        },
        url: {
          required,
          url
        },
        screen: {
          required
        }
      }
    };
  },

  methods: {
    handleItemChoose(demoItem) {
      Object.assign(this.demo, demoItem);
    },

    handleDemoImg(img) {
      this.demo.screen = img;
    },

    screenPath(file) {
      return URL.createObjectURL(file);
    },

    // TODO emit an empty item instead
    handleItemDelete(item, i) {
      this.$emit("DeleteDemo", item, i, "demos", "demo-types");
      this.$refs.demoSelect.reset();
    },

    handleAddItem() {
      this.$emit("AddDemo", this.demo, "demos", "demo-types");
      this.demo = {
        id: null,
        url: "",
        visible: true,
        screen: null,
        name: ""
      };
      this.$v.demo.$reset();
    }
  }
};
</script>
