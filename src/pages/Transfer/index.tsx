import React from 'react';
import { Card, Table, Tag, Button, Space, message } from 'antd';
import { SwapOutlined, PlusOutlined } from '@ant-design/icons';

const Transfer: React.FC = () => {
  const handleUnderDev = () => {
    message.info('Tính năng đang phát triển');
  };

  const columns = [
    { title: 'Mã điều chuyển', dataIndex: 'id', key: 'id' },
    { title: 'Tài sản', dataIndex: 'asset', key: 'asset' },
    { title: 'Từ bộ phận', dataIndex: 'from', key: 'from' },
    { title: 'Đến bộ phận', dataIndex: 'to', key: 'to' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Đã hoàn thành' ? 'green' : 'gold'}>{status}</Tag>
      )
    },
  ];

  return (
    <Card 
      title={<Space><SwapOutlined /> Quản lý Điều chuyển tài sản</Space>} 
      bordered={false}
      extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleUnderDev}>Tạo phiếu điều chuyển</Button>}
    >
      <Table columns={columns} dataSource={[]} locale={{ emptyText: 'Chưa có thông tin điều chuyển' }} />
    </Card>
  );
};

export default Transfer;
