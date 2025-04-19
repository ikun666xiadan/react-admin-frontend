import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Popover } from "antd";
import "./index.css";
import { useDispatch } from "react-redux";
import { setCollapsed } from "../../store/modules/tabs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearUserInfo, getUsersInfo } from "../../store/modules/user";

const { Header } = Layout;

const CommmenHeader = ({ collapsed }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goLogin =()=>{
    navigate('login')
    dispatch(clearUserInfo())
  }
  const content = (
    <div>
      <p className="item">个人中心</p>
      <p className="item" onClick={goLogin}>退出登录</p>
    </div>
  );
  const userInfo = useSelector(state =>state.user.userInfo)
  
  useEffect(() => {
    dispatch(getUsersInfo())
  }, [dispatch]);

  return (
    <div>
      <Header style={{ padding: 0, background: "white" }} className="header">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(setCollapsed())}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Popover placement="bottomRight" title="" content={content}>
          <img src={userInfo.avatar} alt="" className="img"></img>
        </Popover>
      </Header>
    </div>
  );
};

export default CommmenHeader;
