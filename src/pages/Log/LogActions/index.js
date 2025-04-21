import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersInfo } from "../../../store/modules/user";
import dayjs from "dayjs";

const LogActions = () => {
  
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
      title: "action",
      dataIndex: "action",
    },
    {
      title: "target",
      dataIndex: "target",
    },
    {
      title: "query",
      dataIndex: "query",
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
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersInfo());
  }, [dispatch]);

  useEffect(() => {
    const actionLogs = userInfo.logs
      .filter((item) => item.type === "operation")
      .map((item) => ({
        ...item,
        name: userInfo.name,
        timestamp: dayjs.unix(item?.timestamp).format("YYYY-MM-DD HH:mm:ss"),
        target: item.target || "无",
        query: item.query || "无",
      }));
    setDataSource(actionLogs);
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

export default LogActions;
