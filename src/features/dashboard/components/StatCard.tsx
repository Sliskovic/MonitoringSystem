import { Card, Statistic, Spin, Space, Typography } from "antd";
import type { ReactNode } from "react";

const { Text } = Typography;

interface StatCardProps {
  title: string;
  value: number;
  icon?: ReactNode; // Može primiti bilo koju React komponentu, npr. <UserOutlined />
  color?: string;
  loading?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const StatCard = ({
  title,
  value,
  icon,
  color = "#1677ff",
  loading = false,
  prefix,
  suffix,
}: StatCardProps) => (
  <Card>
    {/* Prikazujemo Spin overlay dok se podaci učitavaju */}
    <Spin spinning={loading}>
      <Space direction="horizontal" align="center" style={{ width: "100%" }}>
        {/* Prikazujemo ikonu ako je proslijeđena */}
        {icon && (
          <div
            style={{
              fontSize: 32,
              color: color,
              marginRight: 16,
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon}
          </div>
        )}

        {/* Statistic komponenta sada prima više propsa */}
        <Statistic
          title={<Text style={{ fontSize: 16 }}>{title}</Text>}
          value={value}
          precision={0} // Osigurava da se prikazuju cijeli brojevi
          valueStyle={{ color, fontWeight: 600, fontSize: 24 }}
          prefix={prefix}
          suffix={suffix}
        />
      </Space>
    </Spin>
  </Card>
);
