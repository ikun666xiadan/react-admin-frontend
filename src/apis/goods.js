import { request } from "../utils";

// 获取商品列表
const getGoodsList = (params) => {
  return request({
    url: "/goods",
    method: "GET",
    params
  });
};

// 添加
const addGoods = (data) => {
  return request({
    url: "/goods",
    method: "POST",
    data: data,
  });
};

// 删除
const delGoods = (id) => {
  return request({
    url: `/goods/${id}`,
    method: "DELETE",
  });
};

// 全局搜索
const searchGoodsGlobal = async (keyword) => {
  const allGoods = await request({ url: "/goods", method: "GET" });

  return allGoods.filter((goods) =>
    ["name", "desciption"].some((field) =>
      String(goods[field] || "").includes(keyword)
    )
  );
};

// 更新/编辑
const updateGoods = (data) => {
  return request({
    url: `/goods/${data.id}`,
    method: "PUT",
    data,
  });
};

// 获取详情
const getGoodsInfo = (id)=>{
  return request({
    url:`/goods/${id}`,
    method:"GET"
  })
}

export { getGoodsList,addGoods,delGoods,getGoodsInfo,updateGoods,searchGoodsGlobal };
