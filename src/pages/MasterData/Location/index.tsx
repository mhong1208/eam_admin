import React, { useState } from 'react';
import BaseTable from '@/components/BaseTable';
import { useLocations } from '@/hooks/useLocations';
import { Col, Form, Input } from 'antd';

const Location: React.FC = () => {
  const [filters, setFilters] = useState<any>({});

  const { data, isLoading, refetch } = useLocations(filters);

  const columns = [
    { title: 'Mã vị trí', dataIndex: 'code', key: 'code' },
    { title: 'Tên vị trí', dataIndex: 'name', key: 'name' },
    { title: 'Địa chỉ/Khu vực', dataIndex: 'address', key: 'address' },
  ];

  const filterContent = (
    <>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item name="code" label="Mã vị trí">
          <Input placeholder="Nhập mã vị trí" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item name="name" label="Tên vị trí">
          <Input placeholder="Nhập tên vị trí" />
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
      onAdd={() => console.log('Add new location')}
      onRefresh={refetch}
    />
  );
};

export default Location;
