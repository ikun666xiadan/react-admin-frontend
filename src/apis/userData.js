import { request } from "../utils";

const getUserData = () => {
  return request({
    url: "/userData",
    method: "GET",
  });
};

export { getUserData };
