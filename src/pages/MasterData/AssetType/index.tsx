import React, { useState } from 'react';
import BaseTable from '@/components/BaseTable';
import { useAssetTypes } from '@/hooks/useAssetTypes';
import { message, Modal, Button, Space, Tag, Tooltip } from 'antd';
import { EditOutlined, CheckCircleOutlined, StopOutlined, QuestionCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import AssetTypeDrawer from './components/AssetTypeDrawer';
import * as XLSX from 'xlsx';
import ImportErrorDrawer from './components/ImportErrorDrawer';

interface ImportError {
  row: number;
  code: string;
  name: string;
  reason: string;
  description: string;
}

const AssetTypes: React.FC = () => {
  const [filters, setFilters] = useState<any>({});
  const { data, isLoading, refetch, createAssetType, updateAssetType, updateAssetTypeStatus, importAssetType } = useAssetTypes(filters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [importErrors, setImportErrors] = useState<ImportError[]>([]);
  const [importErrorMessage, setImportErrorMessage] = useState('');
  const [errorDrawerOpen, setErrorDrawerOpen] = useState(false);


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
      title: isActive ? 'Ngưng hoạt động loại tài sản' : 'Kích hoạt loại tài sản',
      icon: <QuestionCircleOutlined style={{ color: isActive ? '#ff4d4f' : '#52c41a' }} />,
      content: isActive
        ? `Bạn có chắc muốn ngưng hoạt động loại tài sản "${record.name}" không?`
        : `Bạn có chắc muốn kích hoạt loại tài sản "${record.name}" không?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      okButtonProps: { danger: isActive },
      onOk: async () => {
        try {
          await updateAssetTypeStatus.mutateAsync({ id: record.id, isActive: !isActive });
          message.success(isActive ? 'Đã ngưng hoạt động loại tài sản' : 'Đã kích hoạt loại tài sản');
        } catch {
          message.error('Thao tác thất bại');
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
        await createAssetType.mutateAsync(values);
        message.success('Thêm mới loại tài sản thành công');
      } else {
        await updateAssetType.mutateAsync({ id: selectedRecord.id, data: values });
        message.success('Cập nhật loại tài sản thành công');
      }
      setDrawerOpen(false);
    } catch (error: any) {
      message.error(error?.response?.data?.message || (drawerMode === 'add' ? 'Thêm mới thất bại' : 'Cập nhật thất bại'));
    }
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        'Tên loại tài sản': '',
        'Mã loại tài sản': '',
        'Mô tả': '',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asset Type Template');

    const wscols = [
      { wch: 30 },
      { wch: 20 },
      { wch: 25 },
    ];
    ws['!cols'] = wscols;

    XLSX.writeFile(wb, 'Asset_Type_Import_Template.xlsx');
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
        const res = await importAssetType.mutateAsync(file);
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

  const columns: any = [
    { title: 'Mã loại', dataIndex: 'code', key: 'code', searchable: true },
    { title: 'Tên loại tài sản', dataIndex: 'name', key: 'name', searchable: true },
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
      <AssetTypeDrawer
        open={drawerOpen}
        mode={drawerMode}
        initialValues={selectedRecord}
        loading={createAssetType.isPending || updateAssetType.isPending}
        onCancel={() => setDrawerOpen(false)}
        onOk={handleDrawerOk}
      />
      <ImportErrorDrawer
        errorDrawerOpen={errorDrawerOpen}
        setErrorDrawerOpen={setErrorDrawerOpen}
        importErrors={importErrors}
        importErrorMessage={importErrorMessage}
        handleDownloadErrors={handleDownloadErrors}
      />
    </>
  );
};

export default AssetTypes;
