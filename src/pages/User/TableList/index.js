import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

const dataSource = [
  {
    id: 1,
    name: "胡彦斌",
    gender: "男",
    date: "2002-02-12",
    phone: "1234567890",
    address: "西湖区湖底公园1号",
  },
  {
    id: 1,
    name: "胡彦斌",
    gender: "男",
    date: "2002-02-12",
    phone: "1234567890",
    address: "西湖区湖底公园1号",
  },
];

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
      dataSource.length >= 1 ? (
        <div className="action">
          <Button type="primary" icon={<EditOutlined />}></Button>
          <Popconfirm title="确认删除吗?">
            <Button type="primary" danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </div>
      ) : null,
  },
];

const TableList = () => {
  return <Table dataSource={dataSource} columns={columns}/>;
};

export default TableList;
