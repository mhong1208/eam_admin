import React, { useState } from 'react';
import { Space, Tooltip, Button, message, Tag } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import BaseTable from '@/components/BaseTable';
import HandoverDrawer from './components/HandoverDrawer';
import { useHandovers } from '@/hooks/useHandovers';

export const HandoverStatus = {
  NEW: 'NEW', // mới tạo
  PENDING: 'PENDING', // chờ duyệt
  APPROVED: 'APPROVED', // đã duyệt
  REJECTED: 'REJECTED', // từ chối
  COMPLETED: 'COMPLETED', // hoàn thành
  CANCELLED: 'CANCELLED', // hủy
} as const;

export type HandoverStatus = typeof HandoverStatus[keyof typeof HandoverStatus];

const Handover: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const { data: handoversData, isLoading, createHandover } = useHandovers();

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
      createHandover.mutate(values, {
        onSuccess: () => {
          message.success('Thêm thành công');
          setDrawerOpen(false);
        },
        onError: () => {
          message.error('Thêm thất bại');
        }
      });
    } else {
      message.warning('Chức năng cập nhật đang được hoàn thiện theo API mới!');
      setDrawerOpen(false);
    }
  };

  const columns: any = [
    { title: 'Mã bàn giao', dataIndex: 'code', key: 'code', searchable: true },
    { title: 'Tài sản', dataIndex: 'asset', key: 'asset', searchable: true },
    { title: 'Người nhận', dataIndex: 'receiver', key: 'receiver', searchable: true },
    { title: 'Người giao', dataIndex: 'sender', key: 'sender' },
    { title: 'Ngày bàn giao', dataIndex: 'date', key: 'date' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        let text = status;
        switch (status) {
          case HandoverStatus.NEW:
            color = 'blue';
            text = 'Mới tạo';
            break;
          case HandoverStatus.PENDING:
            color = 'gold';
            text = 'Chờ duyệt';
            break;
          case HandoverStatus.APPROVED:
            color = 'cyan';
            text = 'Đã duyệt';
            break;
          case HandoverStatus.REJECTED:
            color = 'magenta';
            text = 'Từ chối';
            break;
          case HandoverStatus.COMPLETED:
            color = 'green';
            text = 'Hoàn thành';
            break;
          case HandoverStatus.CANCELLED:
            color = 'red';
            text = 'Hủy';
            break;
          case 'Đã bàn giao': // Fallback for old mock data
            color = 'green';
            break;
          case 'Chờ bàn giao': // Fallback for old mock data
            color = 'gold';
            break;
        }
        return <Tag color={color}>{text}</Tag>;
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
        dataSource={handoversData?.data || handoversData || []}
        loading={isLoading}
        onAdd={handleAdd}
        rowKey="id"
      />
      <HandoverDrawer
        open={drawerOpen}
        mode={drawerMode}
        initialValues={selectedRecord}
        onCancel={() => setDrawerOpen(false)}
        onOk={handleDrawerOk}
      />
    </>
  );
};

export default Handover;
