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
      //   {
      //     path: "create",
      //     component: () => import("@/views/users/index"),
      //     name: "createUsersList",
      //     meta: {
      //       title: "users2",
      //       icon: "mdi-account-circle"
      //     }
      //   }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];
