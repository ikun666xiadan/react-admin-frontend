import Avatar from '../../assets/me.png'
import { Col, Row,Card  } from 'antd';
import "./index.css"

function Home() {
    return (
      <Row>
        <Col span={8}>
          <Card className='user_info' hoverable>
            <div className='user'>
              <img src={Avatar} alt=''/>
              <div className='user_admin'>
                <h1>Admin</h1>
                <p>超级管理员</p>
              </div>
            </div>
            <div className='info'>上次登入时间:  2022-12-5</div>
            <div className='info'>上次登入地点:  江西</div>
          </Card>
        </Col>
        <Col span={16}>col-12</Col>
      </Row>
    );
  }
  
export default Home;
  