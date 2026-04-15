import React, { useRef, useState, useEffect } from 'react';
import { Table, Button, Space, Card, Form, Row, Col, Input, Select, Spin, type TableProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  SearchOutlined,
  PlusOutlined,
  RestOutlined,
  DownloadOutlined,
  UploadOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
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
  searchableColumns?: string[];
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
  searchableColumns,
  ...restProps
}: BaseTableProps<T>) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [filters, setFilters] = useState<any>({});
  const isFirstRender = useRef(true);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      if (onSearchRef.current) {
        onSearchRef.current({
          ...filters,
          pageIndex: 1
        });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const mergedColumns = columns?.map((col: any) => {
    const isSearchable = searchableColumns?.includes(col.dataIndex as string) || col.searchable;
    const hasOptions = col.filters && Array.isArray(col.filters);
    const filterKey = col.key || col.dataIndex;

    if (!isSearchable && !hasOptions) return col;

    return {
      ...col,
      title: (
        <div onClick={(e) => e.stopPropagation()} style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 0 8px 0',
          minWidth: 120
        }}>
          <div style={{
            textAlign: 'center',
            fontWeight: 700,
            color: 'var(--text-h)',
            fontSize: '13px',
            textTransform: 'none',
            marginBottom: 4
          }}>
            {col.title}
          </div>
          {isSearchable && (
            <Input
              placeholder={`${t('Tìm theo')} ${String(col.title).toLowerCase()}`}
              size="middle"
              allowClear
              value={filters[filterKey]}
              onChange={(e) => handleFilterChange(filterKey, e.target.value)}
              style={{
                borderRadius: 20,
                backgroundColor: 'var(--bg)',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                fontSize: '13px'
              }}
            />
          )}
          {hasOptions && (
            <Select
              placeholder={`${t('Chọn')} ${String(col.title).toLowerCase()}`}
              size="middle"
              allowClear
              value={filters[filterKey]}
              onChange={(val) => handleFilterChange(filterKey, val)}
              style={{
                width: '100%',
                borderRadius: 20,
              }}
              dropdownStyle={{ borderRadius: 8 }}
              options={col.filters.map((f: any) => ({ label: f.text, value: f.value }))}
              variant="outlined"
              className="rounded-select"
            />
          )}
        </div>
      ),
      filterIcon: () => null,
    };
  });

  const handleFinish = (values: any) => {
    if (onSearch) {
      onSearch(values);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setFilters({});
    if (onReset) {
      onReset();
    }
  };

  const getAllChildKeys = (record: any, rowKey = 'id') => {
    let keys: React.Key[] = [];

    if (record.children) {
      for (const child of record.children) {
        keys.push(child[rowKey]);
        keys = keys.concat(getAllChildKeys(child, rowKey));
      }
    }

    return keys;
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
          background: 'var(--code-bg)',
          padding: '20px 20px 0 20px',
          borderRadius: 12,
          marginBottom: 20,
          border: '1px solid var(--border)'
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

      <Spin
        spinning={loading as any}
        indicator={<LoadingOutlined style={{ fontSize: 32, color: '#1890ff' }} spin />}
        tip={t('Loading data...')}
      >
        <Table
          rowKey="id"
          size='small'
          bordered
          columns={mergedColumns}
          dataSource={Array.isArray(dataSource) ? dataSource : (dataSource as any)?.items || (dataSource as any)?.data || []}
          pagination={dataSource && typeof dataSource === 'object' && !Array.isArray(dataSource) ? {
            showSizeChanger: true,
            total: (dataSource as any).meta?.itemCount || (dataSource as any).meta?.total || (dataSource as any).total,
            current: (dataSource as any).meta?.pageIndex || (dataSource as any).meta?.currentPage,
            pageSize: (dataSource as any).meta?.pageSize,
            showTotal: (total) => `Total ${total} items`,
            ...restProps.pagination,
          } : restProps.pagination}
          onChange={(pagination, tableFilters, sorter, extra) => {
            if (onSearch) {
              onSearch({
                ...filters,
                pageIndex: pagination.current,
                pageSize: pagination.pageSize,
              });
            }
            if (restProps.onChange) {
              restProps.onChange(pagination, tableFilters, sorter, extra);
            }
          }}
          scroll={{ x: 'max-content' }}
          expandable={{
            expandedRowKeys,
            onExpand: (expanded, record: any) => {
              if (expanded) {
                setExpandedRowKeys(prev =>
                  prev.includes(record.id) ? prev : [...prev, record.id]
                );
              } else {
                const childKeys = getAllChildKeys(record);

                setExpandedRowKeys(prev =>
                  prev.filter(
                    key => key !== record.id && !childKeys.includes(key)
                  )
                );
              }
            },
          }}
          {...restProps}
        />
      </Spin>
    </Card>
  );
};

export default BaseTable;
