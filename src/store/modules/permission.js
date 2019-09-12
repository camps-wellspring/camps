import { constantRouterMap } from "@/router";
import { asyncRouterMap } from "@/router/asyncRoutes";

/**
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {
  if (route.meta && route.meta.permission) {
    return permissions.some(permission => route.meta.permission === permission);
  } else {
    return true;
  }
}

/**
 * @param routes asyncRouterMap
 * @param permissions
 */
function filterAsyncRouter(routes, permissions) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, permissions);
      }
      res.push(tmp);
    }
  });

  return res;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permissions } = data;
        let accessedRouters;
        accessedRouters = filterAsyncRouter(asyncRouterMap, permissions);
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    },
    GenerateRoutesNoPermissions({ commit }) {
      return new Promise(resolve => {
        commit("SET_ROUTERS", asyncRouterMap);
        resolve();
      });
    }
  }
};

export default permission;
