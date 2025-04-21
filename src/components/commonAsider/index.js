import React from "react";
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const NavItem = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "首页",
  },
  {
    key: "goods",
    icon: <ShopOutlined />,
    label: "商品管理",
  },
  {
    key: "user",
    icon: <UserOutlined />,
    label: "用户管理",
  },
  {
    key: "log",
    icon: <UnorderedListOutlined />,
    label: "日志",
    children: [
      {
        key: "log/logLogin",
        icon: <ProfileOutlined />,
        label: "登录日志",
      },
      {
        key: "log/logActions",
        icon: <DesktopOutlined />,
        label: "操作日志",
      },
    ],
  },
];
const Asider = ({ collapsed }) => {
  const navigate = useNavigate();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="nav" />
      <p style={{ color: "white", textAlign: "center", margin: "10px 0" }}>
        通用后台管理系统
      </p>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["home"]}
        items={NavItem}
        onClick={(e) => navigate(e.key)}
      />
    </Sider>
  );
};

export default Asider;
