import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import Asider from "../../components/commonAsider";
import CommmenHeader from "../../components/commonHeader";
import { useSelector } from "react-redux";
import CommonBread from "../../components/commonBreadcrumb";

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
        <CommonBread/>
        <Content
          style={{
            margin: "10px 15px",
            padding: 10,
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
