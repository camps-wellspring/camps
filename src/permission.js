// import router from "./router";
// // import store from "./store";
// import { getToken } from "@/utils/auth"; // getToken from cookie

// import NProgress from "nprogress"; // progress bar
// import "nprogress/nprogress.css";

// NProgress.configure({ showSpinner: false, speed: 700 });

// const whiteList = ["/login"]; // no redirect whitelist

// router.beforeEach((to, from, next) => {
//   NProgress.start(); // start progress bar
//   if (getToken()) {
//     //* Has Token
//     if (to.path === "/login") {
//       next({ path: "/" });
//       NProgress.done();
//     }
//   } else {
//     /* Has No Token */
//     if (whiteList.indexOf(to.path) !== -1) {
//       next();
//     } else {
//       next(`/login?redirect=${to.path}`);
//       NProgress.done();
//     }
//   }
// });

// router.afterEach(() => {
//   NProgress.done(); // finish progress bar
// });
