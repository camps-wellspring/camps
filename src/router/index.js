import Vue from "vue";
import Router from "vue-router";
import Layout from "@/components/Layout";

Vue.use(Router);

export default new Router({
  mode: "history",
  //   base: process.env.BASE_URL,
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: Home
    // },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    },
    {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      children: [
        {
          path: "/",
          component: () => import("@/views/Home.vue"),
          name: "Dashboard",
          meta: {
            icon: "icon-home",
            title: "dashboard"
          }
        }
      ]
    },
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      hidden: true
    },
    {
      path: "/401",
      component: () => import("@/views/errorPage/401"),
      name: "Page401",
      hidden: true
    },
    {
      path: "/404",
      component: () => import("@/views/errorPage/404"),
      name: "Page404",
      hidden: true
    }
    // { path: "*", redirect: "/404", hidden: true }
  ]
});
