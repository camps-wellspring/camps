import { loginByEmail, logout } from "@/api/login";
// getUserInfo
import { getToken, setToken, removeToken } from "@/utils/auth";
import Cookies from "js-cookie";

const user = {
  state: {
    user: "",
    token: getToken(),
    permissions: [],
    language: Cookies.get("language") || "en"
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_PERMISSIONS(state, permissions) {
      state.permissions = permissions;
    }
  },

  actions: {
    LoginByEmail({ commit }, userInfo) {
      const email = userInfo.email;
      return new Promise((resolve, reject) => {
        loginByEmail(email, userInfo.password)
          .then(response => {
            const data = response.data;
            commit("SET_TOKEN", data.token);
            setToken(data.token);
            // window.location.reload();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // GetUserInfo({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo()
    //       .then(response => {
    //         if (!response.data) {
    //           reject("Verification failed, please login again.");
    //         }
    //         const data = response.data;
    //         let user = data.user;
    //         commit("SET_USER", user);
    //         resolve(user);
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    ClientLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};

// Get Only Index Permissions
// function getIndexPermissions(permissions) {
//   if (permissions !== null && permissions.length > 0) {
//     return permissions.filter(elm => {
//       if (elm.includes("index")) {
//         return true;
//       } else {
//         return false;
//       }
//     });
//   } else {
//     return null;
//   }
// }

export default user;
