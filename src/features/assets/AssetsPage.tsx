// src/features/assets/AssetsPage.tsx

import { useState, useEffect } from "react";
import { Table, Space, Button, message, Tag } from "antd";
import type { TableProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  useListAssetsQuery,
  useDeleteAssetMutation,
  type Asset,
} from "@/api/assetsApi";
import CreateAssetModal from "./components/CreateAssetModal";
import EditAssetModal from "./components/EditAssetModal";
import { AssetsToolbar } from "./components/AssetsToolbar";

import {
  statusMap,
  PAGE_SIZE_OPTIONS,
} from "../../store/assets/assetsConstants";

import {
  selectAssetsUI,
  selectAssetsQueryParams,
  selectAssetsData,
  selectAssetsTotal,
  selectIsAssetsFetching,
  selectSelectedIds,
  selectAssetsError,
} from "@/store/assets/assetsSelectors";
import {
  setSearchQuery,
  setSelected,
  setTableState,
  type AssetsFilters,
  type SortDir,
} from "@/store/assets/assetsState";
import type { TableStatePayload } from "@/store/assets/assetsReducers";

export default function AssetsPage() {
  const dispatch = useAppDispatch();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);

  const uiState = useAppSelector(selectAssetsUI);
  const args = useAppSelector(selectAssetsQueryParams);
  const data = useAppSelector(selectAssetsData);
  const total = useAppSelector(selectAssetsTotal);
  const isFetching = useAppSelector(selectIsAssetsFetching);
  const selectedIds = useAppSelector(selectSelectedIds);
  const error = useAppSelector(selectAssetsError);

  const [searchTerm, setSearchTerm] = useState(uiState.searchQuery);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm !== uiState.searchQuery) {
      dispatch(setSearchQuery(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, uiState.searchQuery, dispatch]);

  useEffect(() => {
    setSearchTerm(uiState.searchQuery);
  }, [uiState.searchQuery]);

  const [deleteAsset, { isLoading: isDeleting }] = useDeleteAssetMutation();
  useListAssetsQuery(args);

  const handleTableChange: TableProps<Asset>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    if (Array.isArray(sorter)) return;
    const statusFilter = Array.isArray(filters.status)
      ? filters.status[0]
      : undefined;
    const payload: TableStatePayload = {
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      sortBy: (sorter.field as keyof Asset) || "",
      sortDir: sorter.order
        ? ((sorter.order === "ascend" ? "asc" : "desc") as SortDir)
        : "asc",
      filters: { status: statusFilter as AssetsFilters["status"] },
    };
    dispatch(setTableState(payload));
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(selectedIds.map((id) => deleteAsset(id).unwrap()));
      message.success(`Successfully deleted ${selectedIds.length} asset(s).`);
    } catch (err) {
      message.error("Failed to delete selected assets.");
    }
  };

  const sortOrderFor = (field: keyof Asset) =>
    uiState.sortBy === field
      ? uiState.sortDir === "asc"
        ? "ascend"
        : "descend"
      : undefined;

  const columns: TableProps<Asset>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      sortOrder: sortOrderFor("name"),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      sortOrder: sortOrderFor("status"),
      render: (status: string) => {
        const statusInfo = statusMap[status] || {
          color: "default",
          text: status,
        };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
      filters: Object.keys(statusMap).map((key) => ({
        text: statusMap[key].text,
        value: key,
      })),
      filteredValue: uiState.filters.status ? [uiState.filters.status] : [],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: true,
      sortOrder: sortOrderFor("type"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => setEditingAssetId(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <AssetsToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        uiState={uiState}
        selectedIds={selectedIds}
        isDeleting={isDeleting}
        onDelete={handleDeleteSelected}
        onOpenCreate={() => setIsCreateModalVisible(true)}
      />
      <Table<Asset>
        rowKey="id"
        loading={isFetching}
        dataSource={data}
        columns={columns}
        rowSelection={{
          selectedRowKeys: selectedIds,
          onChange: (keys) => dispatch(setSelected(keys as string[])),
        }}
        pagination={{
          current: uiState.page,
          pageSize: uiState.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
        }}
        onChange={handleTableChange}
        locale={{
          emptyText: error
            ? "Failed to load data from server."
            : "No assets found.",
        }}
      />
      <CreateAssetModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
      />
      <EditAssetModal
        assetId={editingAssetId}
        visible={!!editingAssetId}
        onClose={() => setEditingAssetId(null)}
      />
    </Space>
  );
}
