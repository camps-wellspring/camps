import request from "@/utils/request";

export function deleteMedia(id) {
  return request({
    url: `api/admin/media/${id}`,
    method: "delete"
  });
}
