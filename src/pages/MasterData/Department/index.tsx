import React from 'react';
import BaseTable from '@/components/BaseTable';

const Department: React.FC = () => {
  const columns = [
    { title: 'Tên phòng ban', dataIndex: 'name', key: 'name' },
    { title: 'Mã phòng ban', dataIndex: 'code', key: 'code' },
    { title: 'Trưởng bộ phận', dataIndex: 'manager', key: 'manager' },
  ];

  return (
    <BaseTable
      columns={columns}
      dataSource={[]}
      locale={{ emptyText: 'Chưa có thông tin phòng ban' }}
      onAdd={() => console.log('Add new department')}
      onSearch={(value) => console.log('Search:', value)}
    />
  );
};

export default Department;
