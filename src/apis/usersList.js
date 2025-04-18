import { request } from "../utils";

// 获取用户列表
const getUserList = (params) => {
  return request({
    url: "/users",
    method: "GET",
    params
  });
};

const addUser = (data) => {
  return request({
    url: "/users",
    method: "POST",
    data: data, 
  });
};

const delUser = (id) => {
  return request({
    url: `/users/${id}`,
    method: "DELETE",
  });
};

export { getUserList,addUser,delUser };
