import React, { useState, useMemo } from 'react';
import {
  PieChartOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => ({
  key,
  icon,
  children,
  label,
});

const menuItems: MenuItem[] = [
  getItem('Quản lý khách sạn', '1', <PieChartOutlined />),
];

interface MainLayoutProps {
  children: React.ReactNode;
  breadcrumbItems?: { title: string }[];
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  breadcrumbItems = [],
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const breadcrumb = useMemo(
    () =>
      breadcrumbItems.map((item, index) => ({
        title: item.title,
        key: index,
      })),
    [breadcrumbItems],
  );

  const onMenuClick: MenuProps['onClick'] = (e) => {
    // key '1' tương ứng với menu "Quản lý khách sạn"
    if (e.key === '1') {
      navigate('/');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={menuItems}
          onClick={onMenuClick}  // thêm xử lý click
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumb} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
