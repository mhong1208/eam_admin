import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import BaseDrawer from '@/components/BaseDrawer';

interface DepartmentDrawerProps {
  open: boolean;
  mode: 'add' | 'edit' | 'view';
  initialValues?: any;
  loading?: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
}

const DepartmentDrawer: React.FC<DepartmentDrawerProps> = ({
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
      entityName="phòng ban"
      onClose={onCancel}
      onOk={handleSubmit}
      loading={loading}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        disabled={isView}
      >
        <Form.Item
          name="name"
          label="Tên phòng ban"
          rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban' }]}
        >
          <Input placeholder="Nhập tên phòng ban" />
        </Form.Item>

        <Form.Item
          name="code"
          label="Mã phòng ban"
          rules={[{ required: true, message: 'Vui lòng nhập mã phòng ban' }]}
        >
          <Input placeholder="Nhập mã phòng ban" disabled={mode === 'edit' || mode === 'view'} />
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

export default DepartmentDrawer;
