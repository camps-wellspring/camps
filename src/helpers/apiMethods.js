import {
  index,
  showData,
  storeData,
  updateData,
  deleteData,
  mediaUpdate
} from "@/api/globalRequest";

// method for get data
export const IndexData = args => {
  return index(args.reqName, args.query, args.locale);
};
// method for show specific data
export const ShowData = args => {
  return showData(args.reqName, args.id, args.locale);
};
// method for store data
export const StoreData = args => {
  return storeData(args.reqName, args.data);
};
// method for update data
export const UpdateData = args => {
  return updateData(
    args.reqName,
    args.data,
    args.id,
    args.locale,
    args.thereIsPhotos
  );
};

// method for delete data
export const DeleteData = args => {
  return deleteData(args.reqName, args.id);
};
// method for update media
export const UpdateMedia = args => {
  return mediaUpdate(args.id, args.data);
};
