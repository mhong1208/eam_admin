import React, { useEffect } from 'react';
import { Form, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';
import BaseDrawer from '@/components/BaseDrawer';
import AssetSelect from '@/components/AssetSelect';
import UserSelect from '@/components/UserSelect';

interface HandoverDrawerProps {
    open: boolean;
    mode: 'add' | 'edit' | 'view';
    initialValues?: any;
    loading?: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
}

const HandoverDrawer: React.FC<HandoverDrawerProps> = ({
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
                form.setFieldsValue({
                    ...initialValues,
                    handoverDate: initialValues.handoverDate ? dayjs(initialValues.handoverDate) : undefined,
                    returnDate: initialValues.returnDate ? dayjs(initialValues.returnDate) : undefined,
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, initialValues, form]);

    const handleSubmit = () => {
        form.validateFields().then(values => {
            const formattedValues = {
                ...values,
                handoverDate: values.handoverDate ? values.handoverDate.format('YYYY-MM-DD') : undefined,
                returnDate: values.returnDate ? values.returnDate.format('YYYY-MM-DD') : undefined,
            };
            onOk(formattedValues);
        }).catch(console.error);
    };

    return (
        <BaseDrawer
            open={open}
            mode={mode}
            drawerName="phiếu bàn giao"
            onClose={onCancel}
            onOk={handleSubmit}
            loading={loading}
            width={600}
        >
            <Form form={form} layout="vertical" disabled={mode === 'view'} initialValues={{ status: 'PENDING' }}>
                <Form.Item name="assetId" label="Tài sản" rules={[{ required: true }]}>
                    <AssetSelect />
                </Form.Item>
                <Form.Item name="receiverId" label="Người nhận" rules={[{ required: true }]}>
                    <UserSelect />
                </Form.Item>
                <Form.Item name="senderId" label="Người giao">
                    <UserSelect />
                </Form.Item>
                <Form.Item name="locationId" label="Vị trí sử dụng">
                    <Input placeholder="Vị trí sử dụng tài sản" />
                </Form.Item>
                <Form.Item name="handoverDate" label="Ngày bàn giao" rules={[{ required: true }]}>
                    <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name="assetCondition" label="Tình trạng tài sản">
                    <Input.TextArea rows={2} placeholder="Tình trạng tài sản khi bàn giao" />
                </Form.Item>
                <Form.Item name="handoverReason" label="Lý do bàn giao">
                    <Input.TextArea rows={2} placeholder="Lý do bàn giao" />
                </Form.Item>
                <Form.Item name="notes" label="Ghi chú">
                    <Input.TextArea rows={3} placeholder="Ghi chú thêm hoặc phụ kiện đi kèm" />
                </Form.Item>
            </Form>
        </BaseDrawer>
    );
};
export default HandoverDrawer;
