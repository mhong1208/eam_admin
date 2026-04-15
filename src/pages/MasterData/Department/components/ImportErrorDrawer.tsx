import React from 'react';
import { Button, Drawer, Table, Tag } from 'antd';
import { DownloadOutlined, WarningOutlined } from '@ant-design/icons';

interface ImportErrorDrawerProps {
    importErrors: any[];
    importErrorMessage: string;
    handleDownloadErrors: () => void;
    errorDrawerOpen: boolean;
    setErrorDrawerOpen: (open: boolean) => void;
}

interface ImportError {
    row: number;
    code: string;
    name: string;
    reason: string;
    description: string;
}

const ImportErrorDrawer: React.FC<ImportErrorDrawerProps> = ({
    importErrors,
    importErrorMessage,
    errorDrawerOpen,
    setErrorDrawerOpen,
    handleDownloadErrors,
}) => {
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
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
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
    return (
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
    )

};

export default ImportErrorDrawer;
