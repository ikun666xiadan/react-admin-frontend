import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import Asider from "../../components/commonAsider";
import CommmenHeader from "../../components/commonHeader";
import { useSelector } from "react-redux";

const { Content } = Layout;
const LayoutApp = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const collapsed = useSelector(state =>state.tabs.collapsed)
  return (
    <Layout className="container">
      <Asider collapsed={collapsed} />
      <Layout>
        <CommmenHeader collapsed={collapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutApp;
