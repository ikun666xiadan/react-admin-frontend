import { Button, Form, Input, Modal, Select, DatePicker } from "antd";

const AddForm = ({ isOpen, setIsOpen }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <Modal
      title="Basic Modal"
      footer={null}
      open={isOpen}
      onCancel={() => setIsOpen(!isOpen)}
    >
      <Form
        name="userInfo"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
        initialValues={{ gender: "男" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="username"
          rules={[{ required: true, message: "请输入姓名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="性别" name="gender">
          <Select
            style={{ width: 60 }}
            options={[
              { value: 1, label: "男" },
              { value: 0, label: "女" },
            ]}
          />
        </Form.Item>

        <Form.Item label="出生日期" name="date" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            { required: true, message: "请输入正确的手机号" },
            { pattern: /^1[3-9]\d{9}$/, message: "格式不正确" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="住址" name="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddForm;
