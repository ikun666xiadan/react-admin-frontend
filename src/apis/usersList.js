import { request } from "../utils";

// 获取用户列表
const getUserList = (params) => {
  return request({
    url: "/users",
    method: "GET",
    params,
  });
};

// 添加
const addUser = (data) => {
  return request({
    url: "/users",
    method: "POST",
    data: data,
  });
};

// 删除
const delUser = (id) => {
  return request({
    url: `/users/${id}`,
    method: "DELETE",
  });
};

// 全局搜索（跨字段搜索）
const searchUsersGlobal = async (keyword) => {
  const allUsers = await request({ url: "/users" });

  return allUsers.filter((user) =>
    ["name", "address", "phone", "gender"].some((field) =>
      String(user[field] || "").includes(keyword)
    )
  );
};

// 更新/编辑
const updateUser = (data) => {
  return request({
    url: `/users/${data.id}`,
    method: "PUT",
    data,
  });
};

// 获取详情
const getUserInfo = (id)=>{
  return request({
    url:`/users/${id}`,
    method:"GET"
  })
}

export { getUserList, addUser, delUser, searchUsersGlobal, updateUser, getUserInfo };
