import React, { useEffect, useState } from 'react';
import { Form, Input, Tabs, Button, message, Typography, Alert } from 'antd';
import { KeyOutlined, UserAddOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import BaseDrawer from '@/components/BaseDrawer';

interface AccountModalProps {
  open: boolean;
  employee: any;
  onClose: () => void;
  onCreateAccount: (id: string | number, data: { username: string; password: string }) => Promise<any>;
  onResetPassword: (id: string | number, data: { newPassword: string }) => Promise<any>;
  createLoading?: boolean;
  resetLoading?: boolean;
}

const { Text } = Typography;

const AccountDrawer: React.FC<AccountModalProps> = ({
  open,
  employee,
  onClose,
  onCreateAccount,
  onResetPassword,
  createLoading,
  resetLoading,
}) => {
  const [createForm] = Form.useForm();
  const [resetForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('create');
  const hasAccount = !!employee?.username;

  useEffect(() => {
    if (open) {
      setActiveTab(hasAccount ? 'reset' : 'create');
      createForm.resetFields();
      resetForm.resetFields();
      if (hasAccount && employee?.username) {
        createForm.setFieldValue('username', employee.username);
      }
    }
  }, [open, employee, hasAccount, createForm, resetForm]);

  const handleCreateAccount = async () => {
    try {
      const values = await createForm.validateFields();
      await onCreateAccount(employee.id, { username: values.username, password: values.password });
      message.success('Tạo tài khoản thành công!');
      onClose();
    } catch (error: any) {
      if (error?.errorFields) return;
      message.error(error?.response?.data?.message || 'Tạo tài khoản thất bại');
    }
  };

  const handleResetPassword = async () => {
    try {
      const values = await resetForm.validateFields();
      await onResetPassword(employee.id, { newPassword: values.newPassword });
      message.success('Đặt lại mật khẩu thành công!');
      resetForm.resetFields();
      onClose();
    } catch (error: any) {
      if (error?.errorFields) return;
      message.error(error?.response?.data?.message || 'Đặt lại mật khẩu thất bại');
    }
  };

  const createTabContent = (
    <Form form={createForm} layout="vertical">
      {hasAccount && (
        <Alert
          message="Nhân viên này đã có tài khoản"
          description={`Username hiện tại: ${employee?.username}`}
          type="warning"
          showIcon
          style={{ marginBottom: 16, borderRadius: 8 }}
        />
      )}

      <Form.Item
        name="username"
        label="Tên đăng nhập"
        rules={[
          { required: true, message: 'Vui lòng nhập tên đăng nhập' },
          { min: 3, message: 'Tên đăng nhập tối thiểu 3 ký tự' },
          { pattern: /^[a-zA-Z0-9._-]+$/, message: 'Chỉ dùng chữ, số, dấu . _ -' },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Nhập tên đăng nhập"
          disabled={hasAccount}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu' },
          { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Nhập mật khẩu"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) return Promise.resolve();
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Nhập lại mật khẩu"
        />
      </Form.Item>
    </Form>
  );

  const resetTabContent = (
    <Form form={resetForm} layout="vertical">
      {!hasAccount && (
        <Alert
          message="Nhân viên chưa có tài khoản"
          description="Vui lòng tạo tài khoản trước khi đặt lại mật khẩu."
          type="info"
          showIcon
          style={{ marginBottom: 16, borderRadius: 8 }}
        />
      )}

      <Form.Item label="Nhân viên">
        <Input value={employee?.fullName} disabled prefix={<UserOutlined />} />
      </Form.Item>

      {hasAccount && (
        <Form.Item label="Tên đăng nhập hiện tại">
          <Input value={employee?.username} disabled prefix={<UserOutlined />} />
        </Form.Item>
      )}

      <Form.Item
        name="newPassword"
        label="Mật khẩu mới"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu mới' },
          { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Nhập mật khẩu mới"
          disabled={!hasAccount}
        />
      </Form.Item>

      <Form.Item
        name="confirmNewPassword"
        label="Xác nhận mật khẩu mới"
        dependencies={['newPassword']}
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Nhập lại mật khẩu mới"
          disabled={!hasAccount}
        />
      </Form.Item>
    </Form>
  );

  const tabItems = [
    {
      key: 'create',
      label: <span><UserAddOutlined /> Tạo tài khoản</span>,
      children: createTabContent,
    },
    {
      key: 'reset',
      label: <span><KeyOutlined /> Đặt lại mật khẩu</span>,
      children: resetTabContent,
    },
  ];

  const footerContent = (
    <div style={{ textAlign: 'right', padding: '10px 16px' }}>
      {activeTab === 'create' ? (
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          loading={createLoading}
          disabled={hasAccount}
          onClick={handleCreateAccount}
        >
          {hasAccount ? 'Đã có tài khoản' : 'Tạo tài khoản'}
        </Button>
      ) : (
        <Button
          type="primary"
          danger
          icon={<KeyOutlined />}
          loading={resetLoading}
          disabled={!hasAccount}
          onClick={handleResetPassword}
        >
          Đặt lại mật khẩu
        </Button>
      )}
    </div>
  );

  return (
    <BaseDrawer
      open={open}
      title={
        <span>
          <UserAddOutlined style={{ color: '#1677ff', marginRight: 8 }} />
          Quản lý tài khoản —{' '}
          <Text strong style={{ color: '#1677ff' }}>{employee?.fullName}</Text>
        </span>
      }
      width={480}
      onClose={onClose}
      showFooter={false}
      footer={footerContent}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
      />
    </BaseDrawer>
  );
};

export default AccountDrawer;
