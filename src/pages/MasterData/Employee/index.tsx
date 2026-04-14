import React, { useState } from 'react';
import { Avatar, Button, Space, Tag, Modal, message, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import BaseTable from '@/components/BaseTable';
import { useUsers } from '@/hooks/useUsers';
import EmployeeDrawer from './components/EmployeeDrawer';

const Employee: React.FC = () => {
  const [filters, setFilters] = useState<any>({});
  const { data, isLoading, refetch, createUser, updateUser, deleteUser } = useUsers(filters);

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

  const handleView = (record: any) => {
    setDrawerMode('view');
    setSelectedRecord(record);
    setDrawerOpen(true);
  };

  const handleDelete = (id: string | number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
      content: 'Bạn có chắc chắn muốn xóa nhân viên này không?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteUser.mutateAsync(id);
          message.success('Xóa nhân viên thành công');
        } catch (error) {
          message.error('Xóa nhân viên thất bại');
        }
      },
    });
  };

  const handleDrawerOk = async (values: any) => {
    if (drawerMode === 'view') {
      setDrawerOpen(false);
      return;
    }

    try {
      if (drawerMode === 'add') {
        await createUser.mutateAsync(values);
        message.success('Thêm mới nhân viên thành công');
      } else {
        await updateUser.mutateAsync({ id: selectedRecord.id, data: values });
        message.success('Cập nhật nhân viên thành công');
      }
      setDrawerOpen(false);
    } catch (error: any) {
      message.error(error?.response?.data?.message || (drawerMode === 'add' ? 'Thêm mới thất bại' : 'Cập nhật thất bại'));
    }
  };

  const columns: any = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'name',
      searchable: true,
      render: (text: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar icon={<UserOutlined />} size="small" style={{ color: 'oklch(82.8% 0.111 230.318)', background: 'oklch(93.2% 0.032 255.585)' }} />
          {text}
        </div>
      )
    },
    { title: 'Mã nhân viên', dataIndex: 'code', key: 'code', searchable: true },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
      align: 'center',
      searchable: true,
      render: (text: string) => <span>{text ? text : '-'}</span>
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      align: 'center',
      key: 'role',
      filters: [
        { text: 'Quản trị viên', value: 'ADMIN' },
        { text: 'Nhân viên', value: 'USER' },
      ],
      filterMultiple: false,
      render: (text: string) => <Tag color={text === 'ADMIN' ? 'green' : 'blue'}>{text === 'ADMIN' ? 'Quản trị viên' : 'Nhân viên'}</Tag>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      filters: [
        { text: 'Hoạt động', value: true },
        { text: 'Không hoạt động', value: false },
      ],
      filterMultiple: false,
      render: (text: boolean) => <Tag color={text === true ? 'green' : 'red'}>{text === true ? 'Hoạt động' : 'Không hoạt động'}</Tag>
    },
    {
      title: 'Tác vụ',
      key: 'actions',
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
          <Tooltip title="Xóa">
            <Button 
              danger 
              size="small" 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      )
    }
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
      />

      <EmployeeDrawer
        open={drawerOpen}
        mode={drawerMode}
        initialValues={selectedRecord}
        loading={createUser.isPending || updateUser.isPending}
        onCancel={() => setDrawerOpen(false)}
        onOk={handleDrawerOk}
      />
    </>
  );
};

export default Employee;




