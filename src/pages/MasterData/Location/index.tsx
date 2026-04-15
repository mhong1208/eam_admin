import React, { useState } from 'react';
import BaseTable from '@/components/BaseTable';
import { useLocations } from '@/hooks/useLocations';
import { message, Modal, Button, Space, Tag, Tooltip } from 'antd';
import { EditOutlined, CheckCircleOutlined, StopOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const Location: React.FC = () => {
  const [filters, setFilters] = useState<any>({});
  const { data, isLoading, refetch, createLocation, updateLocation, updateLocationStatus } = useLocations(filters);

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

  const handleToggleStatus = (record: any) => {
    const isActive = record.isActive;
    Modal.confirm({
      title: isActive ? 'Ngưng hoạt động vị trí' : 'Kích hoạt vị trí',
      icon: <QuestionCircleOutlined style={{ color: isActive ? '#ff4d4f' : '#52c41a' }} />,
      content: isActive
        ? `Bạn có chắc muốn ngưng hoạt động vị trí "${record.name}" không?`
        : `Bạn có chắc muốn kích hoạt vị trí "${record.name}" không?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      okButtonProps: { danger: isActive },
      onOk: async () => {
        try {
          await updateLocationStatus.mutateAsync({ id: record.id, isActive: !isActive });
          message.success(isActive ? 'Đã ngưng hoạt động vị trí' : 'Đã kích hoạt vị trí');
        } catch {
          message.error('Thao tác thất bại');
        }
      },
    });
  };

  const columns: any = [
    { title: 'Mã vị trí', dataIndex: 'code', key: 'code', searchable: true },
    { title: 'Tên vị trí', dataIndex: 'name', key: 'name', searchable: true },
    { title: 'Địa chỉ/Khu vực', dataIndex: 'address', key: 'address' },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      filters: [
        { text: 'Hoạt động', value: true },
        { text: 'Ngưng hoạt động', value: false },
      ],
      filterMultiple: false,
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Ngưng hoạt động'}
        </Tag>
      ),
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
          <Tooltip title={record.isActive ? 'Ngưng hoạt động' : 'Kích hoạt'}>
            <Button
              size="small"
              icon={record.isActive ? <StopOutlined /> : <CheckCircleOutlined />}
              style={record.isActive
                ? { color: '#ff4d4f', borderColor: '#ff4d4f' }
                : { color: '#52c41a', borderColor: '#52c41a' }
              }
              onClick={() => handleToggleStatus(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <BaseTable
      columns={columns}
      dataSource={data}
      loading={isLoading}
      onSearch={(values: any) => setFilters(values)}
      onAdd={handleAdd}
      onRefresh={refetch}
    />
  );
};

export default Location;
