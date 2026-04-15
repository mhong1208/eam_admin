import React from 'react';
import { Typography, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <Space direction="vertical" align="center" size="large">
        <SmileOutlined style={{ fontSize: '80px', color: '#1677ff' }} />
        <Title level={2} style={{
          margin: 0,
          background: 'linear-gradient(90deg, #1677ff, #722ed1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          Welcome to EAM System
        </Title>
        <Text type="secondary" style={{ fontSize: '18px' }}>
          Hệ thống Quản lý Tài sản
        </Text>
      </Space>
    </div>
  );
};

export default Dashboard;
