import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getUsersInfo } from "../../../store/modules/user";
import dayjs from "dayjs";

const LogLogin = () => {

  const columns = [
    {
      title: "用户名",
      dataIndex: "name",
    },
    {
      title: "登录时间",
      dataIndex: "timestamp",
    },
    {
      title: "ip",
      dataIndex: "ip",
    },
    {
      title: "登录设备",
      dataIndex: "device",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "success" ? "success" : "error"}>{status}</Tag>
      ),
    },
  ];

  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]); // Fixed syntax here

  useEffect(() => {
    dispatch(getUsersInfo());
  }, [dispatch]);

  useEffect(() => {
    const loginLogs = userInfo.logs
      .filter((item) => item.type === "login")
      .map((item) => ({
        ...item,
        name: userInfo.name,
        timestamp: dayjs.unix(item?.timestamp).format("YYYY-MM-DD HH:mm:ss"),
      }));
    setDataSource(loginLogs);
  }, [userInfo?.logs, userInfo.name]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={"id"}
      pagination={{
        position: ["bottomCenter"],
        showSizeChanger: false,
        defaultPageSize: 8,
      }}
    />
  );
};

export default LogLogin;
