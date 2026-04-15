import React, { useEffect } from 'react';
import { Form, Input, Switch, Row, Col } from 'antd';
import BaseDrawer from '@/components/BaseDrawer';
import TextArea from 'antd/es/input/TextArea';
import LocationSelect from '@/components/LocationSelect';

interface LocationDrawerProps {
    open: boolean;
    mode: 'add' | 'edit' | 'view';
    initialValues?: any;
    loading?: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
}

const LocationDrawer: React.FC<LocationDrawerProps> = ({
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
            drawerName="vị trí"
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
                    label="Mã vị trí"
                    rules={[{ required: true, message: 'Vui lòng nhập mã vị trí' }]}
                >
                    <Input placeholder="Nhập mã vị trí" />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Tên vị trí"
                            rules={[{ required: true, message: 'Vui lòng chọn vị trí' }]}
                        >
                            <Input placeholder="Nhập tên vị trí" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="parentId"
                            label="Vị trí cha"
                        >
                            <LocationSelect />
                        </Form.Item>
                    </Col>
                </Row>

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

export default LocationDrawer;
