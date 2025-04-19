import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsersInfo } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const daspatch = useDispatch();

  useEffect(() => {
    daspatch(getUsersInfo());
  }, [daspatch]);

  const navigate = useNavigate();

  const onFinish = (values) => {
    if (
      values.phone === userInfo.phone &&
      values.password === userInfo.password
    ) {
      message.success("登录成功!");
      navigate("/home");
    } else {
      message.error("账号或密码错误!");
    }
  };
  return (
    <div className="login_form">
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "请输入正确的手机号" },
            { pattern: /^1[3-9]\d{9}$/, message: "格式不正确" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="电话号码" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
