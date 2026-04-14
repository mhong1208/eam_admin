import React from 'react';
import { Table, Button, Space, Card, Form, Row, Col } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  RestOutlined, 
  DownloadOutlined, 
  UploadOutlined, 
  FileExcelOutlined 
} from '@ant-design/icons';
import type { TableProps } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

interface BaseTableProps<T> extends Omit<TableProps<T>, 'title'> {
  onSearch?: (values: any) => void;
  onReset?: () => void;
  onAdd?: () => void;
  onRefresh?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onDownloadTemplate?: () => void;
  extraActions?: React.ReactNode;
  showAddButton?: boolean;
  showImportExport?: boolean;
  filterContent?: React.ReactNode;
}

const BaseTable = <T extends object>({
  columns,
  dataSource,
  loading,
  onSearch,
  onReset,
  onAdd,
  onImport,
  onExport,
  onDownloadTemplate,
  extraActions,
  showAddButton = true,
  showImportExport = true,
  filterContent,
  ...restProps
}: BaseTableProps<T>) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (onSearch) {
      onSearch(values);
    }
  };

  const handleReset = () => {
    form.resetFields();
    if (onReset) {
      onReset();
    }
  };

  return (
    <Card bordered={false} className="base-table-card" style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <Space wrap>
          {showAddButton && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onAdd}
              style={{ borderRadius: 8 }}
            >
              {t('Add New')}
            </Button>
          )}
          {showImportExport && (
            <>
              <Button
                icon={<DownloadOutlined />}
                onClick={onDownloadTemplate}
              >
                {t('Template')}
              </Button>
              <Button
                icon={<UploadOutlined />}
                onClick={onImport}
              >
                {t('Import')}
              </Button>
              <Button
                icon={<FileExcelOutlined />}
                onClick={onExport}
              >
                {t('Export')}
              </Button>
            </>
          )}
          {extraActions}
        </Space>
      </div>

      {filterContent && (
        <div style={{
          background: 'rgba(0,0,0,0.02)',
          padding: '20px 20px 0 20px',
          borderRadius: 12,
          marginBottom: 20,
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
          >
            <Row gutter={[16, 0]}>
              {filterContent}
              <Col flex="none" style={{ alignSelf: 'flex-end', marginBottom: 24 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  >
                    {t('Search')}
                  </Button>
                  <Button
                    icon={<RestOutlined />}
                    onClick={handleReset}
                  >
                    {t('Reset')}
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
          ...restProps.pagination,
        }}
        scroll={{ x: 'max-content' }}
        {...restProps}
      />
    </Card>
  );
};

export default BaseTable;
