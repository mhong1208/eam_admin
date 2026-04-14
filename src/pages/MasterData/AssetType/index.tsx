import React, { useState } from 'react';
import BaseTable from '@/components/BaseTable';
import { useAssetTypes } from '@/hooks/useAssetTypes';
import { Col, Form, Input } from 'antd';

const AssetTypes: React.FC = () => {
  const [filters, setFilters] = useState<any>({});

  const { data, isLoading, refetch } = useAssetTypes(filters);

  const columns = [
    { title: 'Mã loại', dataIndex: 'code', key: 'code' },
    { title: 'Tên loại tài sản', dataIndex: 'name', key: 'name' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
  ];

  const filterContent = (
    <>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item name="code" label="Mã loại">
          <Input placeholder="Nhập mã loại" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item name="name" label="Tên loại">
          <Input placeholder="Nhập tên loại" />
        </Form.Item>
      </Col>
    </>
  );

  return (
    <BaseTable
      columns={columns}
      dataSource={data}
      loading={isLoading}
      filterContent={filterContent}
      onSearch={(values: any) => setFilters(values)}
      onReset={() => setFilters({})}
      onAdd={() => console.log('Add new asset type')}
      onRefresh={refetch}
    />
  );
};

export default AssetTypes;
