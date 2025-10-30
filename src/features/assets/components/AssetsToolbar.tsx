import { Space, Input, Select, Button } from "antd";
import { useAppDispatch } from "@/store/store";
import { statusMap } from "../../../store/assets/assetsConstants";
import {
  clearFilters,
  setFilters,
  type AssetsUIState,
} from "@/store/assets/assetsState";

type AssetsToolbarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  uiState: AssetsUIState;
  selectedIds: string[];
  isDeleting: boolean;
  onDelete: () => void;
  onOpenCreate: () => void;
};

export const AssetsToolbar = ({
  searchTerm,
  setSearchTerm,
  uiState,
  selectedIds,
  isDeleting,
  onDelete,
  onOpenCreate,
}: AssetsToolbarProps) => {
  const dispatch = useAppDispatch();

  return (
    <Space wrap style={{ width: "100%", justifyContent: "space-between" }}>
      <Space wrap>
        <Input.Search
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // onSearch={(value) => {
          //   const v = value.trim();
          //   // setQuery se već dispatch-a iz Pages kroz debounce efekt, ali ovo je instant submit:
          //   // Ako želiš kontrolirati samo kroz debounce, izbaci onSearch i ostavi samo onChange.
          //   // Primjer instant dispatche-a:
          //   // dispatch(setQuery(v));
          // }}
          style={{ width: 220 }}
          allowClear
        />
        <Select
          placeholder="Filter by status"
          value={uiState.filters.status ?? undefined}
          onChange={(value) => dispatch(setFilters({ status: value }))}
          style={{ width: 180 }}
          allowClear
          options={Object.entries(statusMap).map(([key, { text }]) => ({
            label: text,
            value: key,
          }))}
        />
        <Button onClick={() => dispatch(clearFilters())}>Clear Filters</Button>
      </Space>

      <Space>
        <Button
          type="primary"
          danger
          onClick={onDelete}
          disabled={selectedIds.length === 0}
          loading={isDeleting}
        >
          Delete Selected ({selectedIds.length})
        </Button>
        <Button type="primary" onClick={onOpenCreate}>
          Create New
        </Button>
      </Space>
    </Space>
  );
};
