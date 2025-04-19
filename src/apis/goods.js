import { request } from "../utils";

// 获取商品列表
const getGoodsList = () => {
  return request({
    url: "/goods",
    method: "GET",
  });
};

export { getGoodsList };
