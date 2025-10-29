// src/layout/SideNav.tsx
import { Menu } from "antd";
import { DashboardOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export const SideNav = () => {
  const { pathname } = useLocation();
  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[pathname === "/" ? "/dashboard" : pathname]}
      style={{
        paddingTop: 8,
        fontWeight: 500,
        fontSize: 15,
        background: "#001529",
      }}
      items={[
        {
          key: "/dashboard",
          icon: <DashboardOutlined />,
          label: <Link to="/dashboard">Dashboard</Link>,
        },
        {
          key: "/assets",
          icon: <AppstoreOutlined />,
          label: <Link to="/assets">Assets</Link>,
        },
        // {
        //   key: "/incidents",
        //   icon: <AlertOutlined />,
        //   label: <Link to="/incidents">Incidents</Link>,
        // },
        // {
        //   key: "/settings",
        //   icon: <SettingOutlined />,
        //   label: <Link to="/settings">Settings</Link>,
        // },
      ]}
    />
  );
};
