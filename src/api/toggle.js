import request from "@/utils/request";

export function updateToggle({ name, id, field }) {
  console.log(name, id, field);
  let data = { _method: "put" };
  return request({
    url: `api/admin/toggle/${name}/${id}/${field}`,
    method: "post",
    data
  });
}
