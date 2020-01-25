import request from "@/utils/request";
import { client_secret, client_id, grant_type } from "@/config/auth";

export function loginByEmail(email, password) {
  const data = {
    email,
    password,
    client_id,
    client_secret,
    grant_type
  };
  return request({
    url: "/login",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "/api/logout",
    method: "post"
  });
}

// export function getUserInfo() {
//   return request({
//     url: "profile",
//     method: "get"
//   });
// }
