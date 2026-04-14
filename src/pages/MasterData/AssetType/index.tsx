import React, { useState } from 'react';
import BaseTable from '@/components/BaseTable';
import { useAssetTypes } from '@/hooks/useAssetTypes';

const AssetTypes: React.FC = () => {
  const [filters, setFilters] = useState<any>({});

  const { data, isLoading, refetch } = useAssetTypes(filters);

  const columns = [
    { title: 'Mã loại', dataIndex: 'code', key: 'code', searchable: true },
    { title: 'Tên loại tài sản', dataIndex: 'name', key: 'name', searchable: true },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
  ];


  return (
    <BaseTable
      columns={columns}
      dataSource={data}
      loading={isLoading}
      onSearch={(values: any) => setFilters(values)}
      onAdd={() => console.log('Add new asset type')}
      onRefresh={refetch}
    />
  );
};

export default AssetTypes;
