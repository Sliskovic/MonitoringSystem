import { Row, Col, Card, Typography, Space, Button } from "antd";
import { StatCard } from "./components/StatCard";
import { DashboardTable } from "./components/DashboardTable";
import { useAppSelector } from "@/store/store";
import { useListAssetsQuery } from "@/api/assetsApi";

import {
  CheckCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  selectAssetsCountByStatus,
  selectRecentAssets,
} from "@/store/dashboard/dashboardSelectors";

export const DashboardPage = () => {
  const { isFetching } = useListAssetsQuery({ limit: 9999 });

  const assetCounts = useAppSelector(selectAssetsCountByStatus);
  const recentAssets = useAppSelector(selectRecentAssets);

  const stats = [
    {
      title: "Active Assets",
      value: assetCounts.active || 0,
      color: "#52c41a",
      icon: <CheckCircleOutlined />,
    },
    {
      title: "Assets with Warning",
      value: assetCounts.warning || 0,
      color: "#faad14",
      icon: <WarningOutlined />,
    },
    {
      title: "Critical Assets",
      value: assetCounts.critical || 0,
      color: "#cf1322",
      icon: <ExclamationCircleOutlined />,
    },
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
              loading={isFetching}
            />
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: 8 }}>
        <Typography.Title level={4}>Recent Assets</Typography.Title>
        <DashboardTable data={recentAssets} loading={isFetching} />

        <div style={{ textAlign: "right", marginTop: "16px" }}>
          <Link to="/assets">
            <Button type="primary">Show All Assets</Button>
          </Link>
        </div>
      </Card>
    </Space>
  );
};
