import { Route, Routes, Navigate } from 'react-router-dom';
import { UserOutlined, UserAddOutlined, BuildOutlined, BankOutlined } from '@ant-design/icons';
import React from 'react';
import LoginPage from '../../pages/Login/LoginPage';
import HomePage from '../../pages/Home/HomePage';
import type { MenuProps } from 'antd';
import './AppWrapper.css';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Sider } = Layout;

function LocationWrapper() {
  const [breadcrumbItems, setBreadcrumbItems] = React.useState([{ title: 'Inicio' }]);

  const items1: MenuProps['items'] = ['Inicio'].map((key) => ({
    key,
    label: `${key}`,
  }));
  
  function setMenuLabels(key: string) {
    switch (key) {
      case '1':
        return 'Candidatos';
      case '2':
        return 'Empresas';
      case '3':
        return 'Alta de Candidatos';
      case '4':
        return 'Alta de Empresas';
      default:
        return '';
    }
  }

  const selectedItemHandler = (key: '1' | '2' | '3' | '4', optionLabel?: string) => {
    const newBreadcrumbs = generateBreadcrumbs(key, optionLabel);
    setBreadcrumbItems(newBreadcrumbs);
  };

  const generateBreadcrumbs = (key: '1' | '2' | '3' | '4', optionLabel?: string) => {
    const mainRoutes = {
      '1': 'Candidatos',
      '2': 'Empresas',
      '3': 'Alta de Candidatos',
      '4': 'Alta de Empresas',
    };
    if (optionLabel) {
      const mainTitle = mainRoutes[key];
      return [{ title: 'Inicio' }, { title: mainTitle }, { title: optionLabel }];
    } else {
      return [{ title: 'Inicio' }, { title: mainRoutes[key] }];
    }
  };

  const items2: MenuProps['items'] = [UserOutlined, BuildOutlined, UserAddOutlined, BankOutlined].map(
    (icon, index) => {
      const key = (index + 1).toString() as '1' | '2' | '3' | '4';
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: setMenuLabels(key),
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          const optionLabel = `Opción ${subKey}`;
          return {
            key: subKey.toString(),
            label: optionLabel,
            onClick: () => selectedItemHandler(key, optionLabel), 
          };
        }),
      };
    }
  );
  
console.log(breadcrumbItems);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className='layout'>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb items={breadcrumbItems} style={{ margin: '16px 0' }} />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default LocationWrapper;
