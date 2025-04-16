import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import Me from "../../assets/me.png";
import "./index.css";
const { Header } = Layout;

const CommmenHeader = ({ collapsed, setCollapsed }) => {
  return (
    <div>
      <Header style={{ padding: 0, background: "white" }} className="header">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <img src={Me} alt="" className="img"></img>
      </Header>
    </div>
  );
};

export default CommmenHeader;
