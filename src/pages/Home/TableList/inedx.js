import { Col, Row, Card, Table } from "antd";
import { useEffect, useState } from "react";
import { getTableData } from "../../../apis/tableDara";

const columns = [
  {
    title: '型号',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '今日购买',
    dataIndex: 'todayBuy',
    key: 'todayBuy',
  },
  {
    title: '本月购买',
    dataIndex: 'monthBuy',
    key: 'monthBuy',
  },
  {
    title: '总购买',
    key: 'totalBuy',
    dataIndex: 'totalBuy',
  },
];
const TableList = ()=>{
    const [tableData,setTableData] = useState()
    useEffect(()=>{
      const getTableList = async ()=>{
        const res = await getTableData()
        setTableData(res)        
      }
      getTableList()
    },[])
    return (
      <Row>
        <Col span={8}>
          <Card className="user_info" hoverable>
            <Table columns={columns} dataSource={tableData} rowKey="id" size="middle" pagination={false}/>
          </Card>
        </Col>
      </Row>
    )
}

export default TableList