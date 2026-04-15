import React, { useState } from 'react';
import BaseTable from '@/components/BaseTable';
import { useDepartments } from '@/hooks/useDepartments';
import * as XLSX from 'xlsx';
import { message, Modal, Drawer, Table, Tag, Button, Space, Tooltip } from 'antd';
import { ExclamationCircleOutlined, WarningOutlined, DownloadOutlined, EditOutlined, CheckCircleOutlined, StopOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import DepartmentDrawer from './components/DepartmentDrawer';

interface ImportError {
  row: number;
  code: string;
  name: string;
  reason: string;
  description: string;
}

const Department: React.FC = () => {
  const [filters, setFilters] = useState<any>({});
  const { data, isLoading, refetch, importDepartments, createDepartment, updateDepartment, updateDepartmentStatus } = useDepartments(filters);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [importErrors, setImportErrors] = useState<ImportError[]>([]);
  const [importErrorMessage, setImportErrorMessage] = useState('');
  const [errorDrawerOpen, setErrorDrawerOpen] = useState(false);

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
      title: isActive ? 'Ngưng hoạt động phòng ban' : 'Kích hoạt phòng ban',
      icon: <QuestionCircleOutlined style={{ color: isActive ? '#ff4d4f' : '#52c41a' }} />,
      content: isActive
        ? `Bạn có chắc muốn ngưng hoạt động phòng ban "${record.name}" không?`
        : `Bạn có chắc muốn kích hoạt phòng ban "${record.name}" không?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      okButtonProps: { danger: isActive },
      onOk: async () => {
        try {
          await updateDepartmentStatus.mutateAsync({ id: record.id, isActive: !isActive });
          message.success(isActive ? 'Đã ngưng hoạt động phòng ban' : 'Đã kích hoạt phòng ban');
        } catch {
          message.error('Thao tác thất bại');
        }
      },
    });
  };

  const handleDrawerOk = async (values: any) => {
    try {
      if (drawerMode === 'add') {
        await createDepartment.mutateAsync(values);
        message.success('Thêm mới phòng ban thành công');
      } else {
        await updateDepartment.mutateAsync({ id: selectedRecord.id, data: values });
        message.success('Cập nhật phòng ban thành công');
      }
      setDrawerOpen(false);
    } catch (error: any) {
      message.error(error?.response?.data?.message || (drawerMode === 'add' ? 'Thêm mới thất bại' : 'Cập nhật thất bại'));
    }
  };

  const columns: any = [
    { title: 'Tên phòng ban', dataIndex: 'name', key: 'name', searchable: true },
    { title: 'Mã phòng ban', dataIndex: 'code', key: 'code', searchable: true },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
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

  const errorColumns = [
    {
      title: 'Dòng',
      dataIndex: 'row',
      key: 'row',
      width: 70,
      align: 'center' as const,
      render: (row: number) => (
        <Tag color="volcano" style={{ fontWeight: 600 }}>
          #{row}
        </Tag>
      ),
    },
    {
      title: 'Mã phòng ban',
      dataIndex: 'code',
      key: 'code',
      width: 140,
      render: (code: string) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-primary, #1677ff)' }}>
          {code}
        </span>
      ),
    },
    {
      title: 'Tên phòng ban',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Lý do lỗi',
      dataIndex: 'reason',
      key: 'reason',
      render: (reason: string) => (
        <span style={{ color: '#ff4d4f' }}>{reason}</span>
      ),
    },
  ];

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        'Tên phòng ban': 'Phòng Hành chính',
        'Mã phòng ban': 'HC01',
        'Mô tả': 'Mô tả phòng ban',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Department Template');

    const wscols = [
      { wch: 30 },
      { wch: 20 },
      { wch: 25 },
    ];
    ws['!cols'] = wscols;

    XLSX.writeFile(wb, 'Department_Import_Template.xlsx');
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const showImportErrorConfirm = (errMsg: string, errors: ImportError[]) => {
    Modal.confirm({
      title: 'Import thất bại',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      content: (
        <div>
          <p style={{ marginBottom: 8 }}>{errMsg}</p>
          <p style={{ color: '#888', fontSize: 13 }}>
            Bạn có muốn xem danh sách các dòng bị lỗi không?
          </p>
        </div>
      ),
      okText: 'Xem chi tiết',
      cancelText: 'Đóng',
      okButtonProps: { danger: true },
      onOk: () => {
        setImportErrors(errors);
        setImportErrorMessage(errMsg);
        setErrorDrawerOpen(true);
      },
    });
  };

  const handleDownloadErrors = () => {
    const exportData = importErrors.map((item) => ({
      'Mã phòng ban': item.code,
      'Tên phòng ban': item.name,
      'Mô tả': item.description
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    ws['!cols'] = [{ wch: 8 }, { wch: 20 }, { wch: 35 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách lỗi');
    XLSX.writeFile(wb, 'Department_Import_Errors.xlsx');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = await importDepartments.mutateAsync(file);
        const resData = res.data;
        if (resData.type === 'success') {
          message.success(resData.message);
        } else {
          if (resData.errors && resData.errors.length > 0) {
            showImportErrorConfirm(resData.message, resData.errors);
          } else {
            message.error(resData.message);
          }
        }
      } catch (error: any) {
        const errData = error?.response?.data;
        if (errData?.errors && errData.errors.length > 0) {
          showImportErrorConfirm(errData.message, errData.errors);
        } else {
          message.error(errData?.message || 'Import thất bại');
        }
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".xlsx, .xls"
        onChange={handleFileChange}
      />
      <BaseTable
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onSearch={(values: any) => setFilters(values)}
        onAdd={handleAdd}
        onRefresh={refetch}
        onDownloadTemplate={handleDownloadTemplate}
        onImport={handleImport}
      />

      <DepartmentDrawer
        open={drawerOpen}
        mode={drawerMode}
        initialValues={selectedRecord}
        loading={createDepartment.isPending || updateDepartment.isPending}
        onCancel={() => setDrawerOpen(false)}
        onOk={handleDrawerOk}
      />

      <Drawer
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <WarningOutlined style={{ color: '#ff4d4f' }} />
            Danh sách dòng import lỗi
          </span>
        }
        open={errorDrawerOpen}
        onClose={() => setErrorDrawerOpen(false)}
        width={760}
        destroyOnClose
        extra={
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: '#888' }}>{importErrorMessage}</span>
            <Button
              size="small"
              icon={<DownloadOutlined />}
              onClick={handleDownloadErrors}
            >
              Tải xuống
            </Button>
          </span>
        }
      >
        <Table<ImportError>
          columns={errorColumns}
          dataSource={importErrors.map((item) => ({ ...item, key: item.row }))}
          pagination={false}
          size="small"
          bordered
          scroll={{ y: 'calc(100vh - 220px)' }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}>
                  <span style={{ color: '#ff4d4f', fontWeight: 600 }}>
                    Tổng: {importErrors.length} dòng lỗi
                  </span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Drawer>
    </>
  );
};

export default Department;

