import Layout from "@/Layout";
export const asyncRouterMap = [
  {
    path: "/users",
    component: Layout,
    redirect: "/users/list",
    meta: {
      title: "users",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/users/index"),
        name: "UsersList",

        meta: {
          title: "users_list",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/members",
    component: Layout,
    redirect: "/members/list",
    meta: {
      title: "Members",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/members/index"),
        name: "MembersList",
        // hidden: true,

        meta: {
          title: "members_list",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/works",
    component: Layout,
    redirect: "/works/list",
    meta: {
      title: "Works",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/works"),
        name: "WorksList",
        // hidden: true,

        meta: {
          title: "work_list",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "create",
        component: () => import("@/views/works/action"),
        name: "create_work",
        hidden: true,

        meta: {
          title: "work_list",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "edit/:slug",
        component: () => import("@/views/works/action"),
        name: "edit_work",
        hidden: true,

        meta: {
          title: "work_list",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/technologies",
    component: Layout,
    // redirect: "/",
    meta: {
      title: "technologies",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/technologies"),
        name: "Technologies",
        // hidden: true,

        meta: {
          title: "technologies_list",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/platforms",
    component: Layout,
    // redirect: "/",
    meta: {
      title: "platforms",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/platforms"),
        name: "Platforms",
        // hidden: true,

        meta: {
          title: "platforms_list",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/store",
    component: Layout,
    // redirect: "/",
    meta: {
      title: "store",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "categories",
        component: () => import("@/views/store/categories"),
        name: "StoreCategories",
        // hidden: true,
        meta: {
          title: "store_categories",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "projects",
        component: () => import("@/views/store/projects"),
        name: "StoreProjects",
        // hidden: true,
        meta: {
          title: "store_projects",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/services",
    component: Layout,
    redirect: "/services/list",
    meta: {
      title: "services",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/services/index"),
        name: "ServicesList",

        meta: {
          title: "services_list",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "handleService/:slug",
        component: () => import("@/views/services/handleService/index"),
        name: "HandleService",
        hidden: true
      },
      {
        path: ":id/subServices",
        component: () => import("@/views/services/subServices/index"),
        name: "SubServices",
        hidden: true
      }
    ]
  },
  {
    path: "/extra-services",
    component: Layout,
    redirect: "/extra-services/list",
    meta: {
      title: "extra_services",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/extraServices/index"),
        name: "ExtraServicesList",

        meta: {
          title: "extra_services_list",
          icon: "mdi-account-circle"
        }
      }
    ]
  },

  //   {
  //     path: "/members",
  //     component: Layout,
  //     redirect: "/members/list",
  //     meta: {
  //       title: "Members",
  //       icon: "mdi-account-circle"
  //     },
  //     children: [
  //       {
  //         path: "list",
  //         component: () => import("@/views/members/index"),
  //         name: "membersList",

  //         meta: {
  //           title: "list",
  //           icon: "mdi-account-circle"
  //         },
  //         hidden: true
  //       }
  //     ]
  //   },
  { path: "*", redirect: "/404", hidden: true }
];
