// src/features/assets/AssetsTable.tsx
import { Table, Input, Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useState, useMemo } from "react";
import { useListAssetsQuery, type Asset } from "../../../api/assetsApi";

export default function AssetsTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc" | undefined>("asc");

  const { data, isLoading, isFetching } = useListAssetsQuery({
    page,
    limit,
    searchQuery: q,
    sortBy,
    sortDir,
  });

  const columns: ColumnsType<Asset> = useMemo(
    () => [
      { title: "Name", dataIndex: "name", sorter: true },
      { title: "Status", dataIndex: "status", sorter: true },
      { title: "Type", dataIndex: "type", sorter: true },
    ],
    []
  );

  const onChange = (p: TablePaginationConfig, _filters: any, sorter: any) => {
    setPage(p.current ?? 1);
    setLimit(p.pageSize ?? 10);
    if (sorter?.field) {
      setSortBy(sorter.field);
      setSortDir(sorter.order === "descend" ? "desc" : "asc");
    } else {
      setSortBy(undefined);
      setSortDir(undefined);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <Space>
        <Input.Search
          placeholder="Search"
          allowClear
          onSearch={(val) => {
            setPage(1);
            setQ(val);
          }}
          loading={isFetching}
          style={{ width: 260 }}
        />
      </Space>

      <Table<Asset>
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={data?.data ?? []}
        pagination={{
          current: data?.page ?? page,
          pageSize: data?.limit ?? limit,
          total: data?.total ?? 0,
          showSizeChanger: true,
        }}
        onChange={onChange}
      />
    </div>
  );
}
