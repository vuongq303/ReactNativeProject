export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const validatePhone = (number) => {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
};
export const validateEmpty = (object) => {
  var empty = "";
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      if (element == "") {
        empty = empty + " " + key;
      }
    }
  }
  return empty;
};
