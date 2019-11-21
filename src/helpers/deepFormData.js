//* CONSTRUCTING A ONE-LEVEL-DEEP FORMDATA OBJECT FROM A GIVEN NORMAL OBJECT (form)
//! works only with:
//? flat arrays
//? arrays of flat objects
//? arrays of flat objects that contain files
//? files
//? Strings
//? Numbers

import { isEmpty } from "lodash";

export const deepFormData = form => {
  let payload = new FormData();
  for (const el in form) {
    // if the property is not empty
    if (!isEmpty(form[el])) {
      // if the property is an array
      if (form[el] instanceof Array) {
        // if THAT array has at least one nested objects (typically used to detect an array of objects)
        if (form[el].some(val => typeof val === "object")) {
          // flattening each object in that array
          form[el].forEach((obj, i) => {
            for (const prop in obj) {
              payload.append(`${el}[${i}][${prop}]`, obj[prop]);
            }
          });
          // if it's a flat array
        } else {
          form[el].forEach((item, i) => payload.append(`${el}[${i}]`, item));
        }
        // if it's not an array
      } else {
        payload.append(el, form[el]);
      }
      // if it's just a single file
    } else if (form[el] instanceof File) {
      payload.append(el, form[el]);
    }
  }
  return payload;
};
