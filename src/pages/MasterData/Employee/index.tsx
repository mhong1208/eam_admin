import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import BaseTable from '@/components/BaseTable';

const Employee: React.FC = () => {
  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar icon={<UserOutlined />} size="small" />
          {text}
        </div>
      )
    },
    { title: 'Mã nhân viên', dataIndex: 'code', key: 'code' },
    { title: 'Phòng ban', dataIndex: 'department', key: 'department' },
    { title: 'Chức danh', dataIndex: 'position', key: 'position' },
  ];

  return (
    <BaseTable
      columns={columns}
      dataSource={[]}
      locale={{ emptyText: 'Chưa có thông tin nhân viên' }}
      onAdd={() => console.log('Add new employee')}
      onSearch={(value) => console.log('Search:', value)}
    />
  );
};

export default Employee;
