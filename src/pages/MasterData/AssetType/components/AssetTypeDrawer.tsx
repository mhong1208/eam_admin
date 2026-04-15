import React, { useEffect } from 'react';
import { Form, Input, Switch } from 'antd';
import BaseDrawer from '@/components/BaseDrawer';
import TextArea from 'antd/es/input/TextArea';

interface AssetTypeDrawerProps {
    open: boolean;
    mode: 'add' | 'edit' | 'view';
    initialValues?: any;
    loading?: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
}

const AssetTypeDrawer: React.FC<AssetTypeDrawerProps> = ({
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
            if ((mode === 'edit' || mode === 'view') && initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
            }
        }
    }, [open, mode, initialValues, form]);

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                onOk(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const isView = mode === 'view';

    return (
        <BaseDrawer
            open={open}
            mode={mode}
            drawerName="loại tài sản"
            onClose={onCancel}
            onOk={handleSubmit}
            loading={loading}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ isActive: true, role: 'USER' }}
                disabled={isView}
            >
                <Form.Item
                    name="code"
                    label="Mã loại tài sản"
                    rules={[{ required: true, message: 'Vui lòng nhập mã loại tài sản' }]}
                >
                    <Input placeholder="Nhập mã loại tài sản" />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Tên loại tài sản"
                    rules={[{ required: true, message: 'Vui lòng chọn loại tài sản' }]}
                >
                    <Input placeholder="Nhập tên loại tài sản" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                >
                    <TextArea rows={4} placeholder="Nhập mô tả" />
                </Form.Item>

                <Form.Item
                    name="isActive"
                    label="Trạng thái"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Hoạt động" unCheckedChildren="Khóa" />
                </Form.Item>
            </Form>
        </BaseDrawer>
    );
};

export default AssetTypeDrawer;
