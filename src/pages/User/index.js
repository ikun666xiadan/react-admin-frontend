import { PlusOutlined } from "@ant-design/icons";
import { Button,Input } from "antd";
import "./index.css"
import TableList from "./TableList";
import { useState } from "react";
import AddForm from "./Form";


const {Search} = Input

function User() {
  const [showForm,setShowForm] = useState(false)

  const onSearch = (e) =>{
    console.log(e);
    
  }
  return (
    <div className="User">
      <div className="btns">
        <Button type="primary" icon={<PlusOutlined />} onClick={()=>setShowForm(!showForm)}>
          新增
        </Button>
        <Search className="search" placeholder="请输入用户名" onSearch={onSearch} enterButton />
      </div>
      {showForm && <AddForm isOpen={showForm} setIsOpen={setShowForm}/>}
      <TableList/>
    </div>
  );
}

export default User;
