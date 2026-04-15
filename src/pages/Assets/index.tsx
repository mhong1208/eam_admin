import React, { useState } from 'react';
import { Space, Tooltip, Button, message, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import BaseTable from '@/components/BaseTable';
import { useAssets } from '@/hooks/useAssets';
import AssetDrawer from './components/AssetDrawer';

const Assets: React.FC = () => {
  const [filters, setFilters] = useState<any>({});
  const { data, isLoading, refetch, createAsset, updateAsset } = useAssets(filters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

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

  const handleDrawerOk = async (values: any) => {
    try {
      if (drawerMode === 'add') {
        await createAsset.mutateAsync(values);
        message.success('Thêm mới tài sản thành công');
      } else {
        await updateAsset.mutateAsync({ id: selectedRecord.id, data: values });
        message.success('Cập nhật tài sản thành công');
      }
      setDrawerOpen(false);
    } catch (error: any) {
      message.error(error?.response?.data?.message || (drawerMode === 'add' ? 'Thêm mới thất bại' : 'Cập nhật thất bại'));
    }
  };

  const columns: any = [
    { title: 'Mã tài sản', dataIndex: 'code', key: 'code', searchable: true },
    { title: 'Tên tài sản', dataIndex: 'name', key: 'name', searchable: true },
    {
      title: 'Loại',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (category: any) => category?.name || category
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Sẵn sàng', value: 'READY' },
        { text: 'Đang sử dụng', value: 'IN_USE' },
        { text: 'Bảo trì', value: 'MAINTENANCE' },
        { text: 'Đã thanh lý', value: 'DISPOSED' },
      ],
      filterMultiple: false,
      render: (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          READY: { color: 'green', text: 'Sẵn sàng' },
          IN_USE: { color: 'blue', text: 'Đang sử dụng' },
          MAINTENANCE: { color: 'warning', text: 'Bảo trì' },
          DISPOSED: { color: 'default', text: 'Đã thanh lý' }
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: 'Tác vụ',
      key: 'actions',
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space>
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
        dataSource={data}
        loading={isLoading}
        onSearch={(values: any) => setFilters(values)}
        onAdd={handleAdd}
        onRefresh={refetch}
        onDownloadTemplate={() => console.log('Download template')}
        onImport={() => console.log('Import excel')}
        onExport={() => console.log('Export excel')}
        rowKey="id"
      />
      <AssetDrawer
        open={drawerOpen}
        mode={drawerMode}
        initialValues={selectedRecord}
        loading={createAsset.isPending || updateAsset.isPending}
        onCancel={() => setDrawerOpen(false)}
        onOk={handleDrawerOk}
      />
    </>
  );
};

export default Assets;
