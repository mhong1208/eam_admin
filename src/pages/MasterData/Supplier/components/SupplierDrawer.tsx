import React, { useEffect } from 'react';
import { Col, Form, Input, Row } from 'antd';
import BaseDrawer from '@/components/BaseDrawer';

interface SupplierDrawerProps {
  open: boolean;
  mode: 'add' | 'edit' | 'view';
  initialValues?: any;
  loading?: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
}

const SupplierDrawer: React.FC<SupplierDrawerProps> = ({
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
      drawerName="Nhà cung cấp"
      onClose={onCancel}
      onOk={handleSubmit}
      loading={loading}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        disabled={isView}
      >
        <Form.Item
          name="name"
          label="Tên nhà cung cấp"
          rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp' }]}
        >
          <Input placeholder="Nhập tên nhà cung cấp" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="code"
              label="Mã nhà cung cấp"
              rules={[{ required: true, message: 'Vui lòng nhập mã nhà cung cấp' }]}
            >
              <Input placeholder="Nhập mã nhà cung cấp" disabled={mode === 'edit' || mode === 'view'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Vui lòng nhập email' }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>



        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
        >
          <Input.TextArea placeholder="Nhập mô tả" rows={3} />
        </Form.Item>
      </Form>
    </BaseDrawer>
  );
};

export default SupplierDrawer;
