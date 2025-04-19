import { Table, Button, Input,Popconfirm } from "antd";
import { PlusOutlined,EditOutlined,DeleteOutlined } from "@ant-design/icons";
import "./index.css"


const { Search } = Input;

function Goods() {

  const columns = [
    {
      title: "名称",
      key: "name",
    },
    {
      title: "价格",
      key: "price",
    },
    {
      title: "描述",
      key: "desciption",
    },
    {
      title: "库存",
      key: "incentory",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, record) =>
        _.length >= 1 ? (
          <div className="action">
            <Button
              type="primary"
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              title="是否确认删除"
              okText="删除"
              cancelText="取消"
            >
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];
  return (
    <div className="Goods">
      <div className="btns">
        <Button type="primary" icon={<PlusOutlined />}>
          新增
        </Button>
        <Search className="search" placeholder="请输入内容" enterButton />
      </div>
      <Table dataSource={''} columns={columns} />
    </div>
  );
}

export default Goods;
