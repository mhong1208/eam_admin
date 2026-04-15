import React from 'react';
import { Card, Button, Result, message } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';

const InventoryAudit: React.FC = () => {
  const handleUnderDevelopment = () => {
    message.info('Tính năng đang phát triển');
  };

  return (
    <Card bordered={false}>
      <Result
        icon={<FileSearchOutlined style={{ color: '#1890ff' }} />}
        title="Bắt đầu kỳ kiểm kê mới"
        subTitle="Hệ thống sẽ giúp bạn đối soát tài sản thực tế so với sổ sách."
        extra={[
          <Button type="primary" key="start" onClick={handleUnderDevelopment}>
            Tạo đợt kiểm kê
          </Button>,
          <Button key="history" onClick={handleUnderDevelopment}>Lịch sử kiểm kê</Button>,
        ]}
      />
    </Card>
  );
};

export default InventoryAudit;
