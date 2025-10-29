import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Space, Typography } from "antd";

interface HeaderBarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const HeaderBar = ({ collapsed, setCollapsed }: HeaderBarProps) => {
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
        <Avatar
          size="large"
          icon={<UserOutlined />}
          style={{ backgroundColor: "#1677ff" }}
        />
      </Space>
    </div>
  );
};
