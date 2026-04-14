import React, { useState, useMemo } from 'react';
import { Layout, Menu, Button, theme, Space, Avatar, Dropdown, Input, Breadcrumb } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
  SearchOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import {
  getMenuItems,
  getUserMenuItems,
  getLanguageItems
} from '@/config/menu';
import { filterMenuItems } from '@/utils/menu';
import { useThemeStore } from '@/store/useThemeStore';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '@/store/useAuthStore';

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { mode, toggleTheme } = useThemeStore();
  const { t, i18n } = useTranslation();

  const {
    token: { colorTextBase, colorPrimary },
  } = theme.useToken();

  const menuItems: MenuProps['items'] = useMemo(() => getMenuItems(t), [t]);

  const filteredMenuItems = useMemo(() => {
    return filterMenuItems(menuItems as any[], searchValue);
  }, [menuItems, searchValue]);

  const breadcrumbItems = useMemo(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const menuItem = (menuItems as any[]).find(item => item.key === url);
      return {
        key: url,
        title: menuItem ? menuItem.label : _.charAt(0).toUpperCase() + _.slice(1),
        href: url,
      };
    });

    return [
      {
        key: 'home',
        title: t('Home'),
        href: '/',
      },
      ...extraBreadcrumbItems.filter(item => item.key !== '/'),
    ];
  }, [location.pathname, menuItems, t]);

  const userMenuItems: MenuProps['items'] = useMemo(() => getUserMenuItems(t), [t]);
  const languageItems: MenuProps['items'] = useMemo(() => getLanguageItems(i18n.language), [i18n.language]);


  return (
    <Layout style={{ height: '100vh', overflow: 'hidden', background: mode === 'dark' ? '#000814' : '#f0f2f5' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={mode === 'dark' ? 'dark' : 'light'}
        style={{
          boxShadow: '2px 0 8px 0 rgba(0,0,0,0.15)',
          zIndex: 100,
          background: mode === 'dark' ? '#001529' : '#fff',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)'
        }}
      >
        <div style={{
          margin: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: collapsed ? 18 : 24,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          letterSpacing: '1.5px',
          color: colorPrimary
        }} onClick={() => navigate('/')}>
          {collapsed ? 'E' : 'EAM'}
        </div>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '8px 0'
        }}>
          <Menu
            theme={mode === 'dark' ? 'dark' : 'light'}
            mode="inline"
            selectedKeys={[location.pathname]}
            items={filteredMenuItems}
            onClick={({ key }) => navigate(key)}
            style={{
              borderRight: 0,
              background: 'transparent'
            }}
          />
        </div>
      </Sider>

      <Layout style={{
        marginLeft: collapsed ? 80 : 200,
        transition: 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'transparent'
      }}>
        <Header style={{
          padding: '0 24px',
          height: 64,
          lineHeight: '64px',
          background: mode === 'dark' ? 'rgba(0, 21, 41, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 90,
          boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
          flexShrink: 0,
          borderBottom: mode === 'dark' ? '1px solid #1d2b3a' : '1px solid #f0f0f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '20px',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                background: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
              }}
            />
            <div style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
              <Input
                size='large'
                placeholder={t('Search menu...')}
                prefix={<SearchOutlined style={{ color: colorPrimary }} />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                allowClear
                style={{
                  borderRadius: 12,
                  background: mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f5f7fa',
                  border: '1px solid transparent',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => (e.target as any).style.borderColor = colorPrimary}
                onBlur={(e) => (e.target as any).style.borderColor = 'transparent'}
              />
            </div>
          </div>
          <Space size="small">
            <Dropdown
              menu={{
                items: languageItems,
                onClick: ({ key }) => i18n.changeLanguage(key)
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button
                type="text"
                shape="circle"
                icon={<GlobalOutlined />}
                style={{ fontSize: '20px', height: 40, width: 40 }}
              />
            </Dropdown>

            <Button
              type="text"
              shape="circle"
              icon={mode === 'dark' ? <SunOutlined style={{ color: '#faad14' }} /> : <MoonOutlined />}
              onClick={toggleTheme}
              style={{ fontSize: '20px', height: 40, width: 40 }}
            />

            <Dropdown 
              menu={{ 
                items: userMenuItems,
                onClick: ({ key }) => {
                  if (key === 'logout') {
                    logout();
                    localStorage.removeItem('access_token');
                    navigate('/login');
                  }
                }
              }} 
              placement="bottomRight" 
              arrow 
              trigger={['click']}
            >
              <div
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '4px 8px 4px 4px',
                  borderRadius: 30,
                  transition: 'all 0.3s',
                }}>
                <Avatar
                  size="large"
                  style={{
                    backgroundColor: colorPrimary,
                    boxShadow: `0 4px 12px ${colorPrimary}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  icon={<UserOutlined />}
                />
                {!collapsed && <span style={{ color: colorTextBase, fontWeight: 600, fontSize: 14 }}>{user?.name || 'Admin'}</span>}
              </div>
            </Dropdown>
          </Space>
        </Header>

        <div style={{
          padding: '12px 12px 0 12px',
          flexShrink: 0,
          zIndex: 80
        }}>
          <Breadcrumb
            items={breadcrumbItems}
            style={{ fontSize: 13, opacity: 0.8 }}
          />
        </div>

        <Content style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
          background: 'transparent'
        }}>
          <div style={{
            minHeight: '100%',
            background: mode === 'dark' ? '#001529' : '#fff',
            borderRadius: 20,
            padding: 12,
            transition: 'all 0.3s ease',
            boxShadow: mode === 'dark'
              ? '0 10px 30px rgba(0,0,0,0.4)'
              : '0 10px 30px rgba(0,0,0,0.05)',
            border: mode === 'dark' ? '1px solid #1d2b3a' : '1px solid #f0f0f0'
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
