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
import { getUserList } from "../../apis/usersList";
import { addUser } from "../../apis/usersList";

const { Search } = Input;

function User() {
  const [showForm, setShowForm] = useState(false);
  const [userList, setUserList] = useState([]);
  const [form] = Form.useForm();

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

  const handleTableChange = (e) => {
    console.log(e);
    
  };

  // 添加用户
  const onFinish = async (values) => {
    try {
      // 处理日期格式
      const formattedValues = {
        ...values,
        date: values.date ? values.date.format("YYYY-MM-DD") : null,
      };

      await addUser(formattedValues);
      message.success("用户添加成功");
      form.resetFields();
      setShowForm(false);
    } catch (error) {
      message.error("添加用户失败");
      console.error("添加用户失败:", error);
    } finally {
    }
  };

  const onSearch = (e) => {
    console.log(e);
  };
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
            initialValues={{ gender: 1 }} // 使用 value 值而非 label
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
        pagination={{ position: ["bottomCenter"],showSizeChanger: false }}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default User;
