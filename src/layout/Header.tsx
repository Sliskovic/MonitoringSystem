import { logout } from "@/store/auth/authState";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space, Typography, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface HeaderBarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const HeaderBar = ({ collapsed, setCollapsed }: HeaderBarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    message.info("You have been logged out");
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        background: "#fff",
        width: "100%",
        paddingInline: 24,
      }}
    >
      <Space align="center" size={20}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: 18 }}
        />
        <Typography.Title
          level={4}
          style={{ margin: 0, fontWeight: 600, color: "#1f1f1f" }}
        >
          Monitoring System
        </Typography.Title>
      </Space>

      <Space align="center" size={16}>
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
          v1.0
        </Typography.Text>

        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1677ff", cursor: "pointer" }}
          />
        </Dropdown>
      </Space>
    </div>
  );
};
