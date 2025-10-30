import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import type { Asset } from "@/api/assetsApi";

const statusMap: { [key: string]: { color: string; text: string } } = {
  active: { color: "green", text: "Active" },
  warning: { color: "gold", text: "Warning" },
  critical: { color: "red", text: "Critical" },
  inactive: { color: "default", text: "Inactive" },
};

type DashboardTableProps = {
  data: Asset[];
  loading: boolean;
};

export const DashboardTable = ({ data, loading }: DashboardTableProps) => {
  const columns: TableProps<Asset>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const statusInfo = statusMap[status] || {
          color: "default",
          text: status,
        };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
    },
  ];

  return (
    <Table<Asset>
      rowKey="id"
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={false}
    />
  );
};
