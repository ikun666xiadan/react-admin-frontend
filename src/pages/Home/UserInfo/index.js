import { Col, Row, Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersInfo } from "../../../store/modules/user";

const UserInfo = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUsersInfo());
  }, [dispatch]);

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
