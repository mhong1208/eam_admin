import React from 'react';
import { Card, Table, Tag } from 'antd';

const Transfer: React.FC = () => {
  const columns = [
    { title: 'Mã yêu cầu', dataIndex: 'id', key: 'id' },
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
    <Card bordered={false}>
      <Table columns={columns} dataSource={[]} locale={{ emptyText: 'Chưa có thông tin điều chuyển' }} />
    </Card>
  );
};

export default Transfer;
