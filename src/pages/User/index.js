import { PlusOutlined } from "@ant-design/icons";
import { Button,Input } from "antd";
import "./index.css"
import TableList from "./TableList";


const {Search} = Input

function User() {
  const onSearch = (e) =>{
    console.log(e);
    
  }
  return (
    <div className="User">
      <div className="btns">
        <Button type="primary" icon={<PlusOutlined />}>
          新增
        </Button>
        <Search className="search" placeholder="请输入用户名" onSearch={onSearch} enterButton />
      </div>
      <TableList/>
    </div>
  );
}

export default User;
