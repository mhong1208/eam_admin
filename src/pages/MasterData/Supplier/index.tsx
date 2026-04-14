import React, { useState } from 'react';
import BaseTable from '@/components/BaseTable';
import { useSuppliers } from '@/hooks/useSuppliers';

const Supplier: React.FC = () => {
  const [filters, setFilters] = useState<any>({});
  const { data, isLoading, refetch } = useSuppliers(filters);

  const columns = [
    { title: 'Tên nhà cung cấp', dataIndex: 'name', key: 'name', searchable: true },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone', searchable: true },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
  ];


  return (
    <BaseTable
      columns={columns}
      dataSource={data}
      loading={isLoading}
      onSearch={(values: any) => setFilters(values)}
      onAdd={() => console.log('Add new supplier')}
      onRefresh={refetch}
    />
  );
};

export default Supplier;

