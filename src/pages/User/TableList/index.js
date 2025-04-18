import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { getUserList } from "../../../apis/usersList";

const TableList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const res = await getUserList();
      setUserList(res);
    };
    getUserData();
  }, []);
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "出生日期",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, record) =>
        userList.length >= 1 ? (
          <div className="action">
            <Button type="primary" icon={<EditOutlined />}></Button>
            <Popconfirm title="确认删除吗?">
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];
  return (
    <Table
      dataSource={userList}
      columns={columns}
      rowKey="id"
      pagination={{ position: ["bottomCenter"], defaultPageSize: 8 }}
    />
  );
};

export default TableList;
