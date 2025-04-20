import {
  Button,
  Input,
  Table,
  Popconfirm,
  Form,
  Modal,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { addGoods, delGoods, getGoodsInfo, getGoodsList, searchGoodsGlobal, updateGoods } from "../../apis/goods";

const { Search } = Input;

function Goods() {
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();
  const [goodsList, setGoodsList] = useState([]);
  const [goodsId,setGoodsId] = useState('')
  const [formMode,setFormMode] = useState('add')

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "描述",
      dataIndex: "desciption",
      key: "desciption",
    },
    {
      title: "库存",
      dataIndex: "incentory",
      key: "incentory",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, record) =>
        goodsList.length >= 1 ? (
          <div className="action">
            <Button type="primary" icon={<EditOutlined />} onClick={()=>edit(record.id)}></Button>
            <Popconfirm title="是否确认删除" okText="删除" cancelText="取消" onConfirm={()=>del(record.id)}>
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const getGoodsData = async () => {
    const res = await getGoodsList({
      _sort: "created_time",
      _order: "desc",
    });
    setGoodsList(res);
  };
  useEffect(() => {
    getGoodsData();
  }, []);

  const changeModuleOpen = () => {
    setShowForm(!showForm);
    setFormMode('add')
    form.resetFields();
  };

  // 添加/编辑
  const onFinish = async (formValue) => {
    try{
      const goodFormData = {
        name:formValue.name,
        desciption:formValue.desciption,
        price:formValue.price,
        incentory:formValue.incentory,
        created_time:Date.now().toString()
      }
      if(formMode === 'edit' && goodsId){
        await updateGoods({...goodFormData,id:goodsId})
        message.success("商品修改成功")
      }else{
        await addGoods(goodFormData)
        message.success("商品添加成功")
      }
      changeModuleOpen()
      await getGoodsData();
    }catch(error){
      message.error(formMode === "edit" ? "修改失败" : "添加失败");
      console.error("操作失败:", error);
    }
  };

  // 编辑按钮
  const edit = async (id)=>{
    setShowForm(!showForm)
    setFormMode('edit')
    setGoodsId(id)
    const res = await getGoodsInfo(id)
    //回填数据
    form.setFieldsValue(res)
  }

  // 删除
  const del = async(id)=>{
    await delGoods(id)
    message.success("删除成功");
    await getGoodsData();
  }

  // 搜索功能
  const search = async (value)=>{
    const res = await searchGoodsGlobal(value)
    setGoodsList(res)
  }
  return (
    <div className="Goods">
      <div className="btns">
        <Button type="primary" icon={<PlusOutlined />} onClick={changeModuleOpen}>
          新增
        </Button>
        <Search className="search" placeholder="请输入内容" enterButton onSearch={search}/>
      </div>
      <Modal
        title={formMode ==="add" ? "添加商品" : "编辑商品"}
        footer={null}
        open={showForm}
        onCancel={() => {
          setShowForm(false);
          form.resetFields();
        }}
        forceRender // 保持表单一直存在但隐藏
      >
        <Form
          form={form}
          name="userInfo"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 400 }}
          initialValues={{ incentory:0,price:0 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[{ required: true, message: "请输入商品名称" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="价格" name="price" rules={[{ required: true,message: "请输入商品价格" }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item label="商品描述" name="desciption" rules={[{ required: true,message: "请输入商品描述" }]}>
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>

          <Form.Item label="库存" name="incentory">
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={goodsList}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: false,
          defaultPageSize: 8,
        }}
        rowKey={"id"}
      />
    </div>
  );
}

export default Goods;
