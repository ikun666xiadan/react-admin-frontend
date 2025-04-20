import React, { useEffect } from "react";
import { Card, Divider } from "antd";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsersInfo } from "../../store/modules/user";
import dayjs from "dayjs";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const UserCenter = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersInfo());
  }, [dispatch]);

  const navigate = useNavigate()

  return (
    <Card hoverable className="userCenter_contant">
      <div className="top_content">
        <img src={userInfo.avatar} alt=""></img>
        <div className="title">
          <h2>{userInfo.name}</h2>
          <span style={{ color: "#969292" }}>{userInfo.identity}</span>
        </div>
        <LoginOutlined style={{fontSize:"30px",marginLeft:"280px"}} onClick={()=>navigate('/home')}/>
      </div>
      <Divider />
      <div className="bottom_content">
        <p>性别: {userInfo.gender}</p>
        <p>年龄: {userInfo.age}</p>
        <p>手机号: {userInfo.phone}</p>
        <p>生日: {dayjs(userInfo.bridthday).format("MM-DD")}</p>
        <p>ip: {userInfo.login_address}</p>
      </div>
    </Card>
  );
};
export default UserCenter;
