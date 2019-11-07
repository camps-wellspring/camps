import request from "@/utils/request";
import { client_secret, client_id, grant_type } from "@/config/auth";

export function loginByEmail(username, password) {
  const data = {
    username,
    password,
    client_id,
    client_secret,
    grant_type
  };
  return request({
    url: "/oauth/token",
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

export function getUserInfo() {
  return request({
    url: "api/admin/profile/user",
    method: "get"
  });
}
