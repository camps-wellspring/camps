<template>
  <div v-if="!item.hidden && item.children">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <v-list-item
        :to="resolvePath(onlyOneChild.path)"
        router
        exact
        :value="getActiveTile(onlyOneChild.path)"
      >
        <v-list-item-action>
          <v-icon v-html="onlyOneChild.meta.icon || item.meta.icon" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="generateTitle(onlyOneChild.meta.title)" />
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-else>
      <v-list-group
        v-if="item.children && item.children.length > 0"
        router
        :prepend-icon="item.meta.icon || ''"
        no-action
        :value="getActiveGroup(item.path)"
      >
        <v-list-item slot="activator">
          <v-list-item-content>
            <v-list-item-title>{{
              generateTitle(item.meta.title)
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <template v-for="subItem in item.children">
          <v-list-item
            :to="resolvePath(subItem.path)"
            :key="subItem.meta.title"
            v-if="!subItem.children && !subItem.hidden"
          >
            <v-list-item-action>
              <v-icon>{{ subItem.meta.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                v-text="generateTitle(subItem.meta.title)"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-group>
    </template>
  </div>
</template>

<script>
import path from "path";
import { generateTitle } from "@/utils/i18n";
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onlyOneChild: null,
      active: true,
      currentRoute: null
    };
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          // if hidden = true default false
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        // console.log("parent", parent);
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        // console.log("OnlyChild", this.onlyOneChild);
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      let resolvedPath = path.resolve(this.basePath, routePath);
      //   console.log("Path", resolvedPath);
      return resolvedPath;
    },
    getActiveGroup(path) {
      //   console.log("path", path);
      //   console.log("Router Path", this.$route.path);
      if (this.$route.path.includes(path)) {
        return true;
      } else {
        false;
      }
    },
    getActiveTile(path) {
      let fullPath = this.basePath + "/" + path;
      //   console.log("Full", fullPath);
      //   console.log("Router", this.$route.path);
      if (path === "" && this.$route.path === "") {
        return true;
      } else if (this.$route.path === fullPath) {
        // console.log("Equal");
        return true;
      } else {
        false;
      }
    },
    writeSomething(child) {
      console.log("Child", child);
    },

    generateTitle
  }
};
</script>

<style></style>
