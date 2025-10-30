// src/features/assets/assetsSelectors.ts

import { createSelector } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { assetsApi, type PageParams } from "@/api/assetsApi";
import type { RootState } from "../store";

export const selectAssetsUI = (state: RootState) => state.assetsStore;

export const selectSelectedIds = createSelector(
  selectAssetsUI,
  (ui) => ui.selectedIds
);

export const selectAssetsQueryParams = createSelector(
  selectAssetsUI,
  (ui): PageParams => {
    const { page, limit, sortBy, sortDir, searchQuery, filters } = ui;
    const activeFilters: Record<string, string> = {};
    if (filters.status) activeFilters.status = filters.status;
    if (filters.type) activeFilters.type = filters.type;
    return {
      page,
      limit,
      searchQuery: searchQuery || undefined,
      sortBy: sortBy || undefined,
      sortDir: sortDir || undefined,
      filters: activeFilters,
    };
  }
);

const selectAssetsQueryResultSelector = createSelector(
  selectAssetsQueryParams,
  (args) => assetsApi.endpoints.listAssets.select(args)
);

const selectAssetsQueryResult = createSelector(
  (state: RootState) => state,
  selectAssetsQueryResultSelector,
  (state, queryResultSelector) => queryResultSelector(state)
);

export const selectAssetsData = createSelector(
  selectAssetsQueryResult,
  (queryResult) => queryResult.data?.data ?? []
);

export const selectAssetsTotal = createSelector(
  selectAssetsQueryResult,
  (queryResult) => queryResult.data?.total ?? 0
);

export const selectIsAssetsFetching = createSelector(
  selectAssetsQueryResult,
  (queryResult) => queryResult.status === QueryStatus.pending
);

export const selectAssetsError = createSelector(
  selectAssetsQueryResult,
  (queryResult) => queryResult.error
);

// DUPLIKAT JE UKLONJEN OVDJE
