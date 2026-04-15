import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker, Form, Input, Switch } from 'antd';
import BaseDrawer from '@/components/BaseDrawer';
import TextArea from 'antd/es/input/TextArea';
import LocationSelect from '@/components/LocationSelect';
import AssetTypeSelect from '@/components/AssetTypeSelect';
import SupplierSelect from '@/components/SupplierSelect';

interface AssetDrawerProps {
    open: boolean;
    mode: 'add' | 'edit' | 'view';
    initialValues?: any;
    loading?: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
}

const AssetDrawer: React.FC<AssetDrawerProps> = ({
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
                form.setFieldsValue({
                    ...initialValues,
                    purchaseDate: initialValues.purchaseDate ? dayjs(initialValues.purchaseDate) : undefined,
                    warrantyEndDate: initialValues.warrantyEndDate ? dayjs(initialValues.warrantyEndDate) : undefined,
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, mode, initialValues, form]);

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                const formattedValues = {
                    ...values,
                    purchaseDate: values.purchaseDate ? values.purchaseDate.toISOString() : undefined,
                    warrantyEndDate: values.warrantyEndDate ? values.warrantyEndDate.toISOString() : undefined,
                };
                onOk(formattedValues);
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
            drawerName="tài sản"
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
                    label="Mã tài sản"
                    rules={[{ required: true, message: 'Vui lòng nhập mã tài sản' }]}
                >
                    <Input placeholder="Nhập mã tài sản" />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Tên tài sản"
                    rules={[{ required: true, message: 'Vui lòng chọn loại tài sản' }]}
                >
                    <Input placeholder="Nhập tên loại tài sản" />
                </Form.Item>

                <Form.Item
                    name="serialNumber"
                    label="Số serial"
                    rules={[{ required: true, message: 'Vui lòng nhập số serial' }]}
                >
                    <Input placeholder="Nhập số serial" />
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label="Loại tài sản"
                    rules={[{ required: true, message: 'Vui lòng chọn loại tài sản' }]}
                >
                    <AssetTypeSelect />
                </Form.Item>

                <Form.Item
                    name="locationId"
                    label="Vị trí"
                    rules={[{ required: true, message: 'Vui lòng chọn vị trí' }]}
                >
                    <LocationSelect />
                </Form.Item>

                <Form.Item
                    name="vendorId"
                    label="Nhà cung cấp"
                    rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp' }]}
                >
                    <SupplierSelect />
                </Form.Item>

                <Form.Item
                    name="purchasePrice"
                    label="Giá mua"
                    rules={[{ required: true, message: 'Vui lòng nhập giá mua' }]}
                >
                    <Input placeholder="Nhập giá mua" />
                </Form.Item>

                <Form.Item
                    name="purchaseDate"
                    label="Ngày mua"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày mua' }]}
                >
                    <DatePicker placeholder="Chọn ngày mua" />
                </Form.Item>

                <Form.Item
                    name="warrantyEndDate"
                    label="Ngày hết hạn bảo hành"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn bảo hành' }]}
                >
                    <DatePicker placeholder="Chọn ngày hết hạn bảo hành" />
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

export default AssetDrawer;
