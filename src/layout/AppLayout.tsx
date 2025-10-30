import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import { Suspense, useState } from "react";
import { SideNav } from "./SideNav";
import { HeaderBar } from "./Header";

const { Header, Sider, Content } = Layout;

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const siderWidth = 220;
  const collapsedWidth = 80;

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        width={siderWidth}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          height: "100vh",
          zIndex: 100,
          borderRight: "1px solid #f0f0f0",
          background: "#001529",
        }}
      >
        <div
          style={{
            height: 48,
            margin: 16,
            background: "rgba(255,255,255,0.2)",
            borderRadius: 8,
          }}
        />
        <SideNav />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? collapsedWidth : siderWidth,
          transition: "margin-left 0.2s ease",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          background: "#f5f5f5",
        }}
      >
        <Header
          style={{
            background: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 90,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            height: 64,
            paddingInline: 0,
            display: "flex",
            flexShrink: 0,
          }}
        >
          <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>

        <Content
          style={{
            flex: 1,
            overflow: "auto",
            padding: 24,
            background: "#f0f2f5",
          }}
        >
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Spin size="large" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};
