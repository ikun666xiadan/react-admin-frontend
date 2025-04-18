import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Table,
  Popconfirm,
  Form,
  Modal,
  Select,
  DatePicker,
  message,
} from "antd";
import "./index.css";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { delUser, getUserList } from "../../apis/usersList";
import { addUser } from "../../apis/usersList";

const { Search } = Input;

function User() {
  const [showForm, setShowForm] = useState(false);

  const [userList, setUserList] = useState([]);
  const [form] = Form.useForm();
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
            <Popconfirm title="是否确认删除" okText="删除" cancelText="取消" onConfirm={()=>del(record.id)}>
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const getUserData = async () => {
    const res = await getUserList({
      _sort: 'createdAt',
      _order: 'desc'
    });
    setUserList(res);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // 添加用户
  const onFinish = async (values) => {
    try {
      const userData = {
        name: values.name,
        gender: values.gender,
        phone: values.phone,
        address: values.address,
        date: values.date ? values.date.format("YYYY-MM-DD") : null,
        createdAt:new Date()
      };

      await addUser(userData);
      message.success("用户添加成功");
      
      form.resetFields();
      setShowForm(false);
      
      // 重新获取用户列表
      await getUserData();
      
    } catch (error) {
      message.error("添加用户失败");
      console.error("添加用户失败:", error);
    }
  };

  const onSearch = (e) => {
    console.log(e);
  };
  const del = async (id)=>{
    await delUser(id)
    message.success("用户删除成功");
    await getUserData()
  }
  return (
    <div className="User">
      <div className="btns">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowForm(!showForm)}
        >
          新增
        </Button>
        <Search
          className="search"
          placeholder="请输入内容"
          onSearch={onSearch}
          enterButton
        />
      </div>
      {showForm && (
        <Modal
          title="添加用户"
          footer={null}
          open={showForm}
          onCancel={() => setShowForm(false)}
          destroyOnClose
        >
          <Form
            form={form}
            name="userInfo"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 400 }}
            initialValues={{ gender: "男" }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: "请输入姓名" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="性别" name="gender">
              <Select
                style={{ width: 60 }}
                options={[
                  { value: 1, label: "男" },
                  { value: 0, label: "女" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="出生日期"
              name="date"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                { required: true, message: "请输入正确的手机号" },
                { pattern: /^1[3-9]\d{9}$/, message: "格式不正确" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="住址" name="address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                添加
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
      <Table
        dataSource={userList}
        columns={columns}
        rowKey="id"
        pagination={{ position: ["bottomCenter"],showSizeChanger: false,defaultPageSize:8 }}
      />
    </div>
  );
}

export default User;
