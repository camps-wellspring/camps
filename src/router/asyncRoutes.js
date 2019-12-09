import Layout from "@/Layout";
export const asyncRouterMap = [
  // {
  //   path: "/users",
  //   component: Layout,
  //   redirect: "/users/list",
  //   meta: {
  //     title: "users",
  //     icon: "mdi-account-circle"
  //   },
  //   children: [
  //     {
  //       path: "list",
  //       component: () => import("@/views/users/index"),
  //       name: "UsersList",

  //       meta: {
  //         title: "users_list",
  //         icon: "mdi-account-circle"
  //       }
  //     }
  //   ]
  // },
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
          title: "members",
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
          title: "works",
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
          title: "technologies",
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
          title: "platforms",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/demo-types",
    component: Layout,
    // redirect: "/",
    meta: {
      title: "demo_types",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/demo-types"),
        name: "DemoTypes",
        // hidden: true,

        meta: {
          title: "demo_types",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/media",
    component: Layout,
    // redirect: "/",
    meta: {
      title: "media",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/media"),
        name: "media",
        // hidden: true,

        meta: {
          title: "media",
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
        name: "Categories",
        // hidden: true,
        meta: {
          title: "categories",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "projects",
        component: () => import("@/views/store/projects"),
        name: "Projects",
        // hidden: false,
        meta: {
          title: "projects",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "projects/create",
        component: () => import("@/views/store/projects/action"),
        name: "ProjectCreate",
        hidden: true,
        meta: {
          title: "create_project",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "projects/:slug/:actionType",
        component: () => import("@/views/store/projects/action"),
        name: "ProjectEdit",
        hidden: true,
        meta: {
          title: "edit_project",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/order",
    component: Layout,
    redirect: "/order/list",
    meta: {
      title: "order",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/order/index"),
        name: "OrderList",

        meta: {
          title: "order_list",
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
          title: "services",
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
  {
    path: "/budget-ranges",
    component: Layout,
    redirect: "/budget-ranges/list",
    meta: {
      title: "budget_ranges",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/budgetRanges/index"),
        name: "BudgetRangesList",

        meta: {
          title: "budget_ranges_list",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/time-ranges",
    component: Layout,
    redirect: "/time-ranges/list",
    meta: {
      title: "time_ranges",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/timeRanges/index"),
        name: "TimeRangesList",

        meta: {
          title: "time_ranges_list",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/contacts",
    component: Layout,
    redirect: "/contacts/list",
    alwaysShow: true,
    meta: {
      title: "contacts",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/contacts/index"),
        name: "contact_list",

        meta: {
          title: "contact_list",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "topics",
        component: () => import("@/views/contacts/Components/Topics"),
        name: "topics",

        meta: {
          title: "topics",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/settings",
    component: Layout,
    redirect: "/settings/global",
    alwaysShow: true,
    meta: {
      title: "settings",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "global",
        component: () => import("@/views/settings"),
        name: "global",

        meta: {
          title: "global",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "home-page",
        component: () => import("@/views/settings"),
        name: "home_page",

        meta: {
          title: "Home",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "about-page",
        component: () => import("@/views/settings"),
        name: "about_page",

        meta: {
          title: "About",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "contact-page",
        component: () => import("@/views/settings"),
        name: "contact_page",

        meta: {
          title: "Contacts",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "managers-page",
        component: () => import("@/views/settings"),
        name: "managers_page",

        meta: {
          title: "Managers",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "service-page",
        component: () => import("@/views/settings"),
        name: "service_page",

        meta: {
          title: "Service",
          icon: "mdi-account-circle"
        }
      },

      {
        path: "socials",
        component: () => import("@/views/settings"),
        name: "socials_page",

        meta: {
          title: "socials",
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
