import { request } from "../utils";

const getUserList = (params) => {
  return request({
    url: "/users",
    method: "GET",
    params,
  });
};

export { getUserList };
