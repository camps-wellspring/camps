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
    path: "/technologies",
    component: Layout,
    // redirect: "/",
    meta: {
      title: "Technologies",
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
