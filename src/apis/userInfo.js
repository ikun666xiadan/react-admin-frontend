import { request } from "../utils";

const getUserInfo = () => {
  return request({
    url: "/userInfo",
    method: "GET",
  });
};

const loginAPI = (data) => {
  return request({
    url: "/userInfo",
    method: "POST",
    data
  });
};

export { getUserInfo,loginAPI };
