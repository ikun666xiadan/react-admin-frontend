import { request } from "../utils";

const getUserData = () => {
  return request({
    url: "/userData",
    method: "GET",
  });
};

const getUserLine = () => {
  return request({
    url: "/userLine",
    method: "GET",
  });
};

export { getUserData,getUserLine };
