import React, { useState } from 'react';
import BaseTable from '@/components/BaseTable';
import { useDepartments } from '@/hooks/useDepartments';
import * as XLSX from 'xlsx';
import { message } from 'antd';

const Department: React.FC = () => {
  const [filters, setFilters] = useState<any>({});
  const { data, isLoading, refetch, importDepartments } = useDepartments(filters);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const columns = [
    { title: 'Tên phòng ban', dataIndex: 'name', key: 'name', searchable: true },
    { title: 'Mã phòng ban', dataIndex: 'code', key: 'code', searchable: true },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await importDepartments.mutateAsync(file);
        message.success('Import phòng ban thành công');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        message.error('Import phòng ban thất bại');
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
        onAdd={() => console.log('Add new department')}
        onRefresh={refetch}
        onDownloadTemplate={handleDownloadTemplate}
        onImport={handleImport}
      />
    </>
  );
};

export default Department;

