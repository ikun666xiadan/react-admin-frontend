import React from "react";
import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  RiseOutlined,
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
    key: "other",
    icon: <UnorderedListOutlined />,
    label: "其他",
    children: [
      {
        key: "other/otherOne",
        icon: <RiseOutlined />,
        label: "其他一",
      },
      {
        key: "other/otherTwo",
        icon: <DesktopOutlined />,
        label: "其他二",
      },
    ],
  },
];
const Asider = React.memo(({ collapsed }) => {
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
});

export default Asider;
