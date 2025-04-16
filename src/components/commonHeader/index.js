import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout,Popover } from "antd";
import Me from "../../assets/me.png";
import "./index.css";
import { useDispatch } from "react-redux";
import { setCollapsed } from "../../store/modules/tabs";

const { Header } = Layout;

const CommmenHeader = ({ collapsed }) => {
  const content = (
    <div>
      <p className="item">个人中心</p>
      <p className="item">退出登录</p>
    </div>
  );
  const dispatch = useDispatch()

  return (
    <div>
      <Header style={{ padding: 0, background: "white" }} className="header">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={()=>dispatch(setCollapsed())}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Popover placement="bottomRight" title="" content={content}>
          <img src={Me} alt="" className="img"></img>
        </Popover>
      </Header>
    </div>
  );
};

export default CommmenHeader;
