import { helpers } from "vuelidate/lib/validators";

export const isPhone = val => {
  if (val.test("/[0-9]{9,14}/")) {
    return true;
  }
  return;
};

export function isValidImgType(file) {
  return /\.(jpe?g|png)$/i.test(file.name);
}
export function isValidPdfFile(file) {
  return /^[a-z0-9_()\-[\]]+\.pdf$/i.test(file.name);
}

export function isValidImgSize(fileSize, maxSize) {
  let sizeInKB = fileSize / 1024 / 1024;
  if (sizeInKB <= maxSize) {
    return true;
  } else {
    return false;
  }
}

export const minWords = value => text =>
  text ? text.split(" ").length >= value : true;

// export const maxWords = value => text =>
//   text ? text.split(" ").length <= value : true;

export const maxWords = param =>
  helpers.withParams({ type: "maxWords", maxWords: param }, value =>
    value ? value.split(" ").length <= param : true
  );

export const isRequired = value => {
  if (value !== "") {
    return true;
  } else {
    return false;
  }
};
