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
    alwaysShow: true,
    children: [
      {
        path: "list",
        component: () => import("@/views/users/index"),
        name: "UsersList",

        meta: {
          title: "list",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/members",
    component: Layout,
    redirect: "/members/list",
    // alwaysShow: true,

    meta: {
      title: "Members",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/members/index"),
        name: "membersList",

        meta: {
          title: "list",
          icon: "mdi-account-circle"
        },
        hidden: true
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];
