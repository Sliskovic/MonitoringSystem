import { Row, Col, Card, Typography, Space } from "antd";
import { StatCard } from "./components/StatCard";
import { DashboardTable } from "./components/DashboardTable";

export const DashboardPage = () => {
  const stats = [
    { title: "Active Assets", value: 124, color: "#52c41a" },
    { title: "Pending Reviews", value: 32, color: "#faad14" },
    { title: "Critical Alerts", value: 7, color: "#cf1322" },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
          <Col xs={24} sm={12} md={8} key={stat.title}>
            <StatCard
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: 8 }}>
        <Typography.Title level={4}>Asset Overview</Typography.Title>
        <DashboardTable />
      </Card>
    </Space>
  );
};
