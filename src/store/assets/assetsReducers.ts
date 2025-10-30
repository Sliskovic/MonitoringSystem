import type { PayloadAction } from "@reduxjs/toolkit";
import type { AssetsUIState, AssetsFilters, SortDir } from "./assetsState";

export type TableStatePayload = {
  page: number;
  limit: number;
  sortBy: AssetsUIState["sortBy"];
  sortDir: SortDir;
  filters?: Partial<AssetsFilters>;
};

export const assetsReducers = {
  setTableState: (
    state: AssetsUIState,
    action: PayloadAction<TableStatePayload>
  ) => {
    const { page, limit, sortBy, sortDir, filters } = action.payload;
    const sortChanged = state.sortBy !== sortBy || state.sortDir !== sortDir;
    const filtersChanged =
      filters?.status !== undefined && state.filters.status !== filters.status;
    if (filters) state.filters = { ...state.filters, ...filters };
    state.page = sortChanged || filtersChanged ? 1 : page;
    state.limit = limit;
    state.sortBy = sortBy;
    state.sortDir = sortDir;
  },
  setSearchQuery: (state: AssetsUIState, action: PayloadAction<string>) => {
    state.searchQuery = action.payload;
    state.page = 1;
  },
  setFilters: (
    state: AssetsUIState,
    action: PayloadAction<Partial<AssetsFilters>>
  ) => {
    state.filters = { ...state.filters, ...action.payload };
    state.page = 1;
  },
  clearFilters: (state: AssetsUIState) => {
    state.filters = { status: "", type: "" };
    state.searchQuery = "";
    state.sortBy = "";
    state.sortDir = "asc";
    state.page = 1;
  },
  toggleSelected: (state: AssetsUIState, action: PayloadAction<string>) => {
    const id = action.payload;
    state.selectedIds = state.selectedIds.includes(id)
      ? state.selectedIds.filter((x) => x !== id)
      : [...state.selectedIds, id];
  },
  setSelected: (state: AssetsUIState, action: PayloadAction<string[]>) => {
    state.selectedIds = action.payload;
  },
  clearSelected: (state: AssetsUIState) => {
    state.selectedIds = [];
  },
};
