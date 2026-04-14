import BaseTable from '@/components/BaseTable';

const Assets: React.FC = () => {
  const columns = [
    { title: 'Mã tài sản', dataIndex: 'code', key: 'code', searchable: true },
    { title: 'Tên tài sản', dataIndex: 'name', key: 'name', searchable: true },
    { title: 'Loại', dataIndex: 'type', key: 'type' },
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
    },
  ];


  return (
    <BaseTable
      columns={columns}
      dataSource={[]}
      onSearch={(values: any) => console.log('Searching with:', values)}
      onAdd={() => console.log('Add asset')}
      onDownloadTemplate={() => console.log('Download template')}
      onImport={() => console.log('Import excel')}
      onExport={() => console.log('Export excel')}
    />
  );
};

export default Assets;
