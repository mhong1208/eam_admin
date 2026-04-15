import React, { useState } from 'react';
import BaseTable from '@/components/BaseTable';
import { useSuppliers } from '@/hooks/useSuppliers';
import { message, Modal, Button, Space, Tag, Tooltip } from 'antd';
import { EditOutlined, CheckCircleOutlined, StopOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const Supplier: React.FC = () => {
  const [filters, setFilters] = useState<any>({});
  const { data, isLoading, refetch, createSupplier, updateSupplier, updateSupplierStatus } = useSuppliers(filters);

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
      title: isActive ? 'Ngưng hoạt động nhà cung cấp' : 'Kích hoạt nhà cung cấp',
      icon: <QuestionCircleOutlined style={{ color: isActive ? '#ff4d4f' : '#52c41a' }} />,
      content: isActive
        ? `Bạn có chắc muốn ngưng hoạt động nhà cung cấp "${record.name}" không?`
        : `Bạn có chắc muốn kích hoạt nhà cung cấp "${record.name}" không?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      okButtonProps: { danger: isActive },
      onOk: async () => {
        try {
          await updateSupplierStatus.mutateAsync({ id: record.id, isActive: !isActive });
          message.success(isActive ? 'Đã ngưng hoạt động nhà cung cấp' : 'Đã kích hoạt nhà cung cấp');
        } catch {
          message.error('Thao tác thất bại');
        }
      },
    });
  };

  const columns: any = [
    { title: 'Tên nhà cung cấp', dataIndex: 'name', key: 'name', searchable: true },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone', searchable: true },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
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

export default Supplier;
