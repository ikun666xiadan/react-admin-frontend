import { Col, Row, Card } from "antd";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../../apis/userInfo";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserInfoList = async () => {
      const res = await getUserInfo();
      setUserInfo(res);
    };
    getUserInfoList();
  }, []);
  return (
    <Row>
      <Col span={8}>
        <Card className="user_info" hoverable>
          <div className="user">
            <img src={userInfo.avatar} alt="" />
            <div className="user_admin">
              <h1>{userInfo.name}</h1>
              <p>{userInfo.identity}</p>
            </div>
          </div>
          <div className="info">上次登录时间: {userInfo.login_date}</div>
          <div className="info">上次登录地点: {userInfo.login_address}</div>
        </Card>
      </Col>
    </Row>
  );
};

export default UserInfo;
