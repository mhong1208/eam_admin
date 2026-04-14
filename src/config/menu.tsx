import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { TFunction } from 'i18next';

export const getMenuItems = (t: TFunction): MenuProps['items'] => [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: t('Home'),
  },
  {
    key: '/inventory',
    icon: <AppstoreOutlined />,
    label: t('Inventory'),
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: t('Settings'),
    children: [
      {
        key: '/settings/users',
        icon: <UserOutlined />,
        label: t('Users'),
      },
      {
        key: '/settings/roles',
        icon: <SettingOutlined />,
        label: t('Roles'),
      },
    ],
  },
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
