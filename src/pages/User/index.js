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
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  delUser,
  getUserInfo,
  getUserList,
  searchUsersGlobal,
  updateUser,
} from "../../apis/usersList";
import { addUser } from "../../apis/usersList";
import moment from "moment";
const { Search } = Input;

function User() {
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [userList, setUserList] = useState([]);
  const [userId,setUserId] = useState('')
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
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => edit(record.id)}
            ></Button>
            <Popconfirm
              title="是否确认删除"
              okText="删除"
              cancelText="取消"
              onConfirm={() => del(record.id)}
            >
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  // 获取用户列表
  const getUserData = async () => {
    const res = await getUserList({
      _sort: "createdAt",
      _order: "desc",
    });
    setUserList(res);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const addButton =()=>{
    setFormMode('add')
    setShowForm(!showForm)
    form.resetFields();
  }

  // 添加/编辑用户
  const onFinish = async (values) => {
    try {
      const userData = {
        name: values.name,
        gender: values.gender, 
        phone: values.phone,
        address: values.address,
        date: values.date ? values.date.format("YYYY-MM-DD") : null,
      };
  
      if(formMode === "edit" && userId) {
        await updateUser({
          ...userData,
          id: userId
        });
        message.success("用户修改成功");
      } else {
        await addUser({
          ...userData,
          createdAt: new Date()
        });
        message.success("用户添加成功");
      }
  
      form.resetFields();
      setShowForm(false);
      await getUserData();
    } catch (error) {
      message.error(formMode === "edit" ? "修改用户失败" : "添加用户失败");
      console.error("操作失败:", error);
    }
  };

  // 搜索功能
  const onSearch = async (value) => {
    if (!value.trim()) {
      await getUserData(); // 如果搜索关键词为空，恢复显示全部数据
      return;
    }
    try {
      const res = await searchUsersGlobal(value);
      setUserList(res);
    } catch (error) {
      message.error("搜索失败");
    }
  };

  // 删除用户
  const del = async (id) => {
    await delUser(id);
    message.success("用户删除成功");
    await getUserData();
  };

  // 编辑功能
  const edit = async (id) => {
    try {
      setFormMode('edit')
      setUserId(id)
      // 1. 先获取数据
      const res = await getUserInfo(id);

      // 2. 准备回填数据（处理日期字段）
      const formValues = {
        ...res,
        date: res.date ? moment(res.date) : null, // 转换日期格式
      };

      setShowForm(true);

      // 4. 确保表单已挂载后设置值
      setTimeout(() => {
        form.setFieldsValue(formValues);
      }, 0);
    } catch (error) {
      message.error("获取用户信息失败");
    }
  };

  return (
    <div className="User">
      <div className="btns">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addButton}
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

      <Modal
        title={formMode === "add" ? "添加用户" : "编辑用户"}
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
                { value: "男", label: "男" },
                { value: "女", label: "女" },
              ]}
            />
          </Form.Item>

          <Form.Item label="出生日期" name="date" rules={[{ required: true }]}>
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
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={userList}
        columns={columns}
        rowKey="id"
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: false,
          defaultPageSize: 8,
        }}
      />
    </div>
  );
}

export default User;
