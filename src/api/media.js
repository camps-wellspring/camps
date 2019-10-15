import request from "@/utils/request";

export function deleteMedia(id) {
  return request({
    url: `media/${id}`,
    method: "delete"
  });
}
