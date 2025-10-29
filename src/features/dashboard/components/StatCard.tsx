import { Card, Statistic } from "antd";

interface StatCardProps {
  title: string;
  value: number;
  color?: string;
}

export const StatCard = ({
  title,
  value,
  color = "#1677ff",
}: StatCardProps) => (
  <Card>
    <Statistic
      title={title}
      value={value}
      valueStyle={{ color, fontWeight: 600 }}
    />
  </Card>
);
