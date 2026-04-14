import type { MenuProps } from 'antd';
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  PropertySafetyOutlined,
  SwapOutlined,
  ToolOutlined,
  FileSearchOutlined,
  TagsOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  TeamOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import type { TFunction } from 'i18next';

export const getMenuItems = (t: TFunction): MenuProps['items'] => [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: t('Dashboard'),
  },
  {
    key: '/assets',
    icon: <PropertySafetyOutlined />,
    label: t('Asset Management'),
  },
  {
    key: '/transfer',
    icon: <SwapOutlined />,
    label: t('Transfer/Handover'),
  },
  {
    key: '/maintenance',
    icon: <ToolOutlined />,
    label: t('Maintenance/Repair'),
  },
  {
    key: '/inventory-audit',
    icon: <FileSearchOutlined />,
    label: t('Inventory/Audit'),
  },
  {
    key: '/master-data',
    icon: <DatabaseOutlined />,
    label: t('Master Data'),
    children: [
      {
        key: '/master-data/asset-types',
        icon: <TagsOutlined />,
        label: t('Asset Type'),
      },
      {
        key: '/master-data/locations',
        icon: <EnvironmentOutlined />,
        label: t('Location'),
      },
      {
        key: '/master-data/suppliers',
        icon: <ShopOutlined />,
        label: t('Supplier'),
      },
      {
        key: '/master-data/employees',
        icon: <TeamOutlined />,
        label: t('Employee'),
      },
      {
        key: '/master-data/departments',
        icon: <ApartmentOutlined />,
        label: t('Department'),
      },
    ],
  }
];

export const getUserMenuItems = (t: TFunction): MenuProps['items'] => [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: t('Profile'),
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: t('Logout'),
    danger: true,
  },
];

export const getLanguageItems = (currentLang: string): MenuProps['items'] => [
  {
    key: 'vi',
    label: 'Tiếng Việt',
    disabled: currentLang === 'vi',
    icon: <span style={{ marginRight: 8 }}>🇻🇳</span>,
  },
  {
    key: 'en',
    label: 'English',
    disabled: currentLang === 'en',
    icon: <span style={{ marginRight: 8 }}>🇺🇸</span>,
  },
];

export const getFooterMenuItems = (t: TFunction, collapsed: boolean): MenuProps['items'] => [
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: !collapsed && t('Logout'),
    title: t('Logout'),
    danger: true,
  },
];
