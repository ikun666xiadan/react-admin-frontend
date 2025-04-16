import { request } from "../utils";

const getUserInfo = () => {
  return request({
    url: "/userInfo",
    method: "GET",
  });
};

export { getUserInfo };
