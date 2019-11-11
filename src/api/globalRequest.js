import request from "@/utils/request";
import cookies from "js-cookie";
// import checkThereIsQuery from "@/helpers/checkQuery";

export function index(reqName, query = {}, locale) {
  return request({
    url: `api/admin/${reqName}`,
    headers: { "X-locale": locale ? locale : cookies.get("language") },
    method: "get",
    params: {
      ...query
    }
  });
}

export function showData(reqName, slug, locale = "en") {
  return request({
    url: `api/admin/${reqName}/${slug}`,
    headers: { "X-locale": locale },
    method: "get"
  });
}

export function storeData(reqName, data) {
  return request({
    url: `api/admin/${reqName}`,
    method: "post",
    data
  });
}
export const updateData = (reqName, data, id, locale = "en") => {
  return request({
    url: `api/admin/${reqName}/${id}`,
    method: "post",
    headers: { "X-locale": locale ? locale : cookies.get("language") },
    data
  });
};
export function deleteData(reqName, id) {
  return request({
    url: `api/admin/${reqName}/${id}`,
    method: "delete"
  });
}
export function mediaUpdate(id, data) {
  return request({
    url: `api/admin/media/${id}`,
    method: "post",
    data
  });
}
