import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from "./assetsConstants";
import type { Asset } from "@/api/assetsApi";
import { assetsReducers } from "./assetsReducers";
import { registerAssetsExtraReducers } from "./assetsExtraReducers";

// --- Tipovi ---
export type SortDir = "asc" | "desc";
export type AssetsFilters = {
  status?: "active" | "warning" | "critical" | "inactive" | "";
  type?: "hardware" | "software" | "";
};
export type AssetsUIState = {
  page: number;
  limit: number;
  sortBy?: keyof Asset | "";
  sortDir?: SortDir;
  searchQuery: string;
  filters: AssetsFilters;
  selectedIds: string[];
};

// --- Inicijalno Stanje ---
const initialAssetsUIState: AssetsUIState = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_PAGE_LIMIT,
  sortBy: "",
  sortDir: "asc",
  searchQuery: "",
  filters: { status: "", type: "" },
  selectedIds: [],
};

// --- Slice ---
const assetsState = createSlice({
  name: "assets",
  initialState: initialAssetsUIState,
  reducers: assetsReducers,
  extraReducers: registerAssetsExtraReducers,
});

export const {
  setTableState,
  setSearchQuery,
  setFilters,
  clearFilters,
  toggleSelected,
  setSelected,
  clearSelected,
} = assetsState.actions;
export default assetsState.reducer;
