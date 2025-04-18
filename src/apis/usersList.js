import { request } from "../utils";

// 获取用户列表
const getUserList = (params) => {
  return request({
    url: "/users",
    method: "GET",
    params:{
      ...params,
      pageNum: 1,
      pageSize: 8,
      sortField: 'date', 
      sortOrder: 'desc' 
    }
  });
};

const addUser = (data) => {
  return request({
    url: "/users",
    method: "POST",
    data: data, 
  });
};

export { getUserList,addUser };
