import {
  Button,
  Input,
  Table,
  Popconfirm,
  Form,
  Modal,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getGoodsList } from "../../apis/goods";

const { Search } = Input;

function Goods() {
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();
  const [goodsList, setGoodsList] = useState([]);

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "描述",
      dataIndex: "desciption",
      key: "desciption",
    },
    {
      title: "库存",
      dataIndex: "incentory",
      key: "incentory",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, record) =>
        goodsList.length >= 1 ? (
          <div className="action">
            <Button type="primary" icon={<EditOutlined />}></Button>
            <Popconfirm title="是否确认删除" okText="删除" cancelText="取消">
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const getGoodsData = async () => {
    const res = await getGoodsList();
    setGoodsList(res);
  };
  useEffect(() => {
    getGoodsData();
  }, []);

  const addButton = () => {
    setShowForm(!showForm);
    form.resetFields();
  };

  const onFinish = (e) => {
    console.log(e);
  };
  return (
    <div className="Goods">
      <div className="btns">
        <Button type="primary" icon={<PlusOutlined />} onClick={addButton}>
          新增
        </Button>
        <Search className="search" placeholder="请输入内容" enterButton />
      </div>
      <Modal
        title={"添加商品"}
        footer={null}
        open={showForm}
        onCancel={() => {
          setShowForm(false);
          form.resetFields();
        }}
        forceRender // 保持表单一直存在但隐藏
      >
        <Form
          form={form}
          name="userInfo"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 400 }}
          initialValues={{ incentory: 0, price: 0 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[{ required: true, message: "请输入商品名称" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="价格" name="price">
            <InputNumber />
          </Form.Item>

          <Form.Item label="商品描述" name="desciption">
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>

          <Form.Item label="库存" name="incentory" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={goodsList}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: false,
          defaultPageSize: 8,
        }}
        rowKey={"id"}
      />
    </div>
  );
}

export default Goods;
