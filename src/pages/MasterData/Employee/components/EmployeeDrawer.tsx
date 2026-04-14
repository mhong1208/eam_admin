import React, { useEffect } from 'react';
import { Form, Input, Select, Switch, Row, Col } from 'antd';
import BaseDrawer from '@/components/BaseDrawer';

interface EmployeeDrawerProps {
  open: boolean;
  mode: 'add' | 'edit' | 'view';
  initialValues?: any;
  loading?: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
}

const EmployeeDrawer: React.FC<EmployeeDrawerProps> = ({
  open,
  mode,
  initialValues,
  loading,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if ((mode === 'edit' || mode === 'view') && initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [open, mode, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        onOk(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const isView = mode === 'view';

  return (
    <BaseDrawer
      open={open}
      mode={mode}
      entityName="nhân viên"
      onClose={onCancel}
      onOk={handleSubmit}
      loading={loading}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ isActive: true, role: 'USER' }}
        disabled={isView}
      >
        <Form.Item
          name="fullName"
          label="Họ tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          name="code"
          label="Mã nhân viên"
          rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
        >
          <Input placeholder="Nhập mã nhân viên" disabled={mode === 'edit' || mode === 'view'} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Chức danh"
              rules={[{ required: true, message: 'Vui lòng chọn chức danh' }]}
            >
              <Select placeholder="Chọn chức danh">
                <Select.Option value="ADMIN">Quản trị viên</Select.Option>
                <Select.Option value="USER">Nhân viên</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="department"
              label="Phòng ban"
            >
              <Input placeholder="Nhập phòng ban" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: 'email', message: 'Email không hợp lệ' },
            { required: mode === 'add', message: 'Vui lòng nhập email' }
          ]}
        >
          <Input placeholder="Nhập địa chỉ email" />
        </Form.Item>

        <Form.Item
          name="isActive"
          label="Trạng thái"
          valuePropName="checked"
        >
          <Switch checkedChildren="Hoạt động" unCheckedChildren="Khóa" />
        </Form.Item>
      </Form>
    </BaseDrawer>
  );
};

export default EmployeeDrawer;
