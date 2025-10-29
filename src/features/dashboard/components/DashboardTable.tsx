import { Table, Tag } from "antd";

interface Asset {
  key: string;
  name: string;
  type: string;
  status: "active" | "offline" | "maintenance";
}

const data: Asset[] = [
  { key: "1", name: "Generator A1", type: "Generator", status: "active" },
  { key: "2", name: "Pump B3", type: "Pump", status: "maintenance" },
  { key: "3", name: "Sensor X7", type: "Sensor", status: "offline" },
];

export const DashboardTable = () => {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Asset["status"]) => {
        const color =
          status === "active" ? "green" : status === "offline" ? "red" : "gold";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
};
