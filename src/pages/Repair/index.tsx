import React, { useState } from 'react';
import { Space, Tooltip, Button, message, Tag } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import BaseTable from '@/components/BaseTable';
import RepairDrawer from './components/RepairDrawer';

const Repair: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const [dataSource, setDataSource] = useState([
    { id: 1, code: 'RP-001', asset: 'Điều hòa LG', reporter: 'Nguyễn Văn A', date: '2024-03-20', status: 'Đang sửa' },
    { id: 2, code: 'RP-002', asset: 'Máy tính HP', reporter: 'Trần Thị B', date: '2024-03-21', status: 'Chờ xử lý' }
  ]);

  const handleAdd = () => {
    setDrawerMode('add');
    setSelectedRecord(null);
    setDrawerOpen(true);
  };

  const handleEdit = (record: any) => {
    setDrawerMode('edit');
    setSelectedRecord(record);
    setDrawerOpen(true);
  };

  const handleView = (record: any) => {
    setDrawerMode('view');
    setSelectedRecord(record);
    setDrawerOpen(true);
  };

  const handleDrawerOk = (values: any) => {
    if (drawerMode === 'add') {
      setDataSource([...dataSource, { ...values, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
      message.success('Thêm thành công');
    } else {
      setDataSource(dataSource.map(d => d.id === selectedRecord.id ? { ...d, ...values } : d));
      message.success('Cập nhật thành công');
    }
    setDrawerOpen(false);
  };

  const columns: any = [
    { title: 'Mã phiếu', dataIndex: 'code', key: 'code', searchable: true },
    { title: 'Tài sản', dataIndex: 'asset', key: 'asset', searchable: true },
    { title: 'Người báo cáo', dataIndex: 'reporter', key: 'reporter' },
    { title: 'Ngày báo cáo', dataIndex: 'date', key: 'date' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'gold';
        if (status === 'Hoàn thành') color = 'green';
        if (status === 'Đang sửa') color = 'blue';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Tác vụ',
      key: 'actions',
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        dataSource={dataSource}
        onAdd={handleAdd}
        rowKey="id"
      />
      <RepairDrawer
        open={drawerOpen}
        mode={drawerMode}
        initialValues={selectedRecord}
        onCancel={() => setDrawerOpen(false)}
        onOk={handleDrawerOk}
      />
    </>
  );
};

export default Repair;
