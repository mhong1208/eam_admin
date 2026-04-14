import React, { useState } from 'react';
import BaseTable from '@/components/BaseTable';
import { useLocations } from '@/hooks/useLocations';

const Location: React.FC = () => {
  const [filters, setFilters] = useState<any>({});

  const { data, isLoading, refetch } = useLocations(filters);

  const columns = [
    { title: 'Mã vị trí', dataIndex: 'code', key: 'code', searchable: true },
    { title: 'Tên vị trí', dataIndex: 'name', key: 'name', searchable: true },
    { title: 'Địa chỉ/Khu vực', dataIndex: 'address', key: 'address' },
  ];


  return (
    <BaseTable
      columns={columns}
      dataSource={data}
      loading={isLoading}
      onSearch={(values: any) => setFilters(values)}
      onAdd={() => console.log('Add new location')}
      onRefresh={refetch}
    />
  );
};

export default Location;
