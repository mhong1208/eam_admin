import React from 'react';
import BaseTable from '@/components/BaseTable';

const Supplier: React.FC = () => {
  const columns = [
    { title: 'Tên nhà cung cấp', dataIndex: 'name', key: 'name' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
  ];

  return (
    <BaseTable
      columns={columns}
      dataSource={[]}
      locale={{ emptyText: 'Chưa có dữ liệu nhà cung cấp' }}
      onAdd={() => console.log('Add new supplier')}
      onSearch={(value) => console.log('Search:', value)}
    />
  );
};

export default Supplier;
