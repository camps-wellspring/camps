export const isPhone = val => {
  if (val.test("/[0-9]{9,14}/")) {
    return true;
  }
  return;
};

export function isValidImgType(file) {
  return /\.(jpe?g|png)$/i.test(file.name);
}

export function isValidImgSize(fileSize, maxSize) {
  let sizeInKB = fileSize / 1024 / 1024;
  if (sizeInKB <= maxSize) {
    return true;
  } else {
    return false;
  }
}
