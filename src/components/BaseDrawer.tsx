import React from 'react';
import { Drawer, Button, Space } from 'antd';
import type { DrawerProps } from 'antd';
import { useTranslation } from 'react-i18next';

interface BaseDrawerProps extends DrawerProps {
  mode?: 'add' | 'edit' | 'view';
  entityName?: string;
  loading?: boolean;
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  showFooter?: boolean;
  okText?: string;
  cancelText?: string;
}


/**
 * BaseDrawer component dùng chung cho các tác vụ Thêm mới, Chỉnh sửa và Xem chi tiết.
 * Được thiết kế để trượt từ cạnh màn hình vào (thay vì modal).
 */
const BaseDrawer: React.FC<BaseDrawerProps> = ({
  mode = 'add',
  entityName = '',
  loading = false,
  onOk,
  onClose,
  children,
  title,
  showFooter = true,
  okText,
  cancelText,
  ...restProps
}) => {
  const { t } = useTranslation();

  // Tự động tạo tiêu đề nếu không truyền vào
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

  return (
    <Drawer
      title={getTitle()}
      width={restProps.width || 600}
      onClose={onClose}
      open={restProps.open}
      destroyOnClose
      maskClosable={mode === 'view'}
      footer={showFooter ? (
        <div style={{ textAlign: 'right', padding: '10px 16px' }}>
          <Space>
            <Button onClick={(e) => onClose?.(e as any)}>{cancelText || t('Hủy')}</Button>
            {mode !== 'view' && (
              <Button 
                type="primary" 
                onClick={onOk} 
                loading={loading}
              >
                {getOkText()}
              </Button>
            )}
          </Space>
        </div>
      ) : null}
      {...restProps}
    >
      <div style={{ paddingTop: 8 }}>
        {children}
      </div>
    </Drawer>
  );
};

export default BaseDrawer;
