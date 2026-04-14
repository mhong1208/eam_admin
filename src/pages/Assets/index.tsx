import React from 'react';
import { Col, Form, Input, Select } from 'antd';
import BaseTable from '@/components/BaseTable';

const Assets: React.FC = () => {
  const columns = [
    { title: 'Mã tài sản', dataIndex: 'code', key: 'code' },
    { title: 'Tên tài sản', dataIndex: 'name', key: 'name' },
    { title: 'Loại', dataIndex: 'type', key: 'type' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
  ];

  const filterContent = (
    <>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item name="code" label="Mã tài sản">
          <Input placeholder="Nhập mã tài sản" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item name="name" label="Tên tài sản">
          <Input placeholder="Nhập tên tài sản" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item name="status" label="Trạng thái">
          <Select placeholder="Chọn trạng thái" allowClear>
            <Select.Option value="READY">Sẵn sàng</Select.Option>
            <Select.Option value="IN_USE">Đang sử dụng</Select.Option>
            <Select.Option value="MAINTENANCE">Bảo trì</Select.Option>
            <Select.Option value="DISPOSED">Đã thanh lý</Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </>
  );

  return (
    <BaseTable
      columns={columns}
      dataSource={[]}
      filterContent={filterContent}
      onSearch={(values: any) => console.log('Searching with:', values)}
      onReset={() => console.log('Resetting filters')}
      onAdd={() => console.log('Add asset')}
      onDownloadTemplate={() => console.log('Download template')}
      onImport={() => console.log('Import excel')}
      onExport={() => console.log('Export excel')}
    />
  );
};

export default Assets;
