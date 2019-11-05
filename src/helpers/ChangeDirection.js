import cookie from "js-cookie";

const changeDirection = () => {
  if (cookie.get("language") === "ar") {
    return true;
  } else {
    return false;
  }
};

export default changeDirection;
