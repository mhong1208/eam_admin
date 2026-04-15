import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import BaseDrawer from '@/components/BaseDrawer';

interface MaintenanceDrawerProps {
    open: boolean;
    mode: 'add' | 'edit' | 'view';
    initialValues?: any;
    loading?: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
}

const MaintenanceDrawer: React.FC<MaintenanceDrawerProps> = ({
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
            drawerName="kế hoạch bảo trì"
            onClose={onCancel}
            onOk={handleSubmit}
            loading={loading}
            width={600}
        >
            <Form form={form} layout="vertical" disabled={mode === 'view'} initialValues={{ status: 'Hoạt động' }}>
                <Form.Item name="code" label="Mã kế hoạch" rules={[{ required: true }]}>
                    <Input placeholder="Nhập mã kế hoạch" />
                </Form.Item>
                <Form.Item name="asset" label="Tài sản" rules={[{ required: true }]}>
                    <Input placeholder="Tên tài sản" />
                </Form.Item>
                <Form.Item name="cycle" label="Chu kỳ (tháng)" rules={[{ required: true }]}>
                    <Input type="number" placeholder="Chu kỳ tính bằng tháng" />
                </Form.Item>
                <Form.Item name="status" label="Trạng thái">
                    <Select options={[{value:'Hoạt động', label:'Hoạt động'},{value:'Tạm ngưng', label:'Tạm ngưng'}]} />
                </Form.Item>
            </Form>
        </BaseDrawer>
    );
};
export default MaintenanceDrawer;
