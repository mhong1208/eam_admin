import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import BaseDrawer from '@/components/BaseDrawer';

interface RepairDrawerProps {
    open: boolean;
    mode: 'add' | 'edit' | 'view';
    initialValues?: any;
    loading?: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
}

const RepairDrawer: React.FC<RepairDrawerProps> = ({
    open,
    mode,
    initialValues,
    loading,
    onCancel,
    onOk,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
            }
        }
    }, [open, initialValues, form]);

    const handleSubmit = () => {
        form.validateFields().then(onOk).catch(console.error);
    };

    return (
        <BaseDrawer
            open={open}
            mode={mode}
            drawerName="yêu cầu sửa chữa"
            onClose={onCancel}
            onOk={handleSubmit}
            loading={loading}
            width={600}
        >
            <Form form={form} layout="vertical" disabled={mode === 'view'} initialValues={{ status: 'Chờ xử lý' }}>
                <Form.Item name="code" label="Mã phiếu" rules={[{ required: true }]}>
                    <Input placeholder="Nhập mã phiếu" />
                </Form.Item>
                <Form.Item name="asset" label="Tài sản" rules={[{ required: true }]}>
                    <Input placeholder="Tên tài sản" />
                </Form.Item>
                <Form.Item name="reporter" label="Người báo cáo" rules={[{ required: true }]}>
                    <Input placeholder="Tên người báo cáo" />
                </Form.Item>
                <Form.Item name="status" label="Trạng thái">
                    <Select options={[{value:'Chờ xử lý', label:'Chờ xử lý'},{value:'Đang sửa', label:'Đang sửa'},{value:'Hoàn thành', label:'Hoàn thành'}]} />
                </Form.Item>
            </Form>
        </BaseDrawer>
    );
};
export default RepairDrawer;
