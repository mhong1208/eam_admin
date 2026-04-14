import React from 'react';
import { Modal, Button, Space } from 'antd';
import type { ModalProps } from 'antd';
import { useTranslation } from 'react-i18next';

interface BaseModalProps extends Omit<ModalProps, 'onOk'> {
  mode?: 'add' | 'edit' | 'view';
  entityName?: string;
  loading?: boolean;
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  showFooter?: boolean;
}

/**
 * BaseModal component dùng chung cho các tác vụ Thêm mới, Chỉnh sửa và Xem chi tiết.
 * Hỗ trợ tự động hiển thị tiêu đề và nút bấm tương ứng với chế độ (mode).
 */
const BaseModal: React.FC<BaseModalProps> = ({
  mode = 'add',
  entityName = '',
  loading = false,
  onOk,
  onCancel,
  children,
  title,
  showFooter = true,
  okText,
  cancelText,
  ...restProps
}) => {
  const { t } = useTranslation();

  // Tự động tạo tiêu đề nếu không truyền vào tiêu đề cụ thể
  const getTitle = () => {
    if (title) return title;
    const prefix = mode === 'add' ? t('Thêm mới') : mode === 'edit' ? t('Chỉnh sửa') : t('Chi tiết');
    return `${prefix} ${entityName}`;
  };

  // Tự động tạo text cho nút OK nếu không truyền vào
  const getOkText = () => {
    if (okText) return okText;
    return mode === 'add' ? t('Thêm mới') : t('Lưu thay đổi');
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onOk) {
      onOk(e);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onCancel) {
      onCancel(e as any);
    }
  };

  return (
    <Modal
      title={getTitle()}
      open={restProps.open}
      onCancel={onCancel}
      confirmLoading={loading}
      destroyOnClose
      maskClosable={false}
      centered
      width={restProps.width || 600}
      footer={showFooter ? (
        <Space>
          <Button onClick={handleCancel}>{cancelText || t('Hủy')}</Button>
          {mode !== 'view' && (
            <Button 
              type="primary" 
              onClick={handleOk} 
              loading={loading}
            >
              {getOkText()}
            </Button>
          )}
        </Space>
      ) : null}
      {...restProps}
    >
      <div style={{ paddingTop: 16 }}>
        {children}
      </div>
    </Modal>
  );
};

export default BaseModal;

