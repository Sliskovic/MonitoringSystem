import { createSelector } from "@reduxjs/toolkit";
import { assetsApi, type Asset } from "@/api/assetsApi";
import type { RootState } from "@/store/store";

const selectAllAssetsResultSelector = assetsApi.endpoints.listAssets.select({
  limit: 9999,
});

const selectAllAssetsQueryResult = (state: RootState) =>
  selectAllAssetsResultSelector(state);

const selectAllAssetsData = createSelector(
  selectAllAssetsQueryResult,
  (queryResult) => queryResult.data?.data ?? []
);

export const selectAssetsCountByStatus = createSelector(
  selectAllAssetsData,
  (assets) => {
    return assets.reduce((acc: Record<string, number>, asset: Asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1;
      return acc;
    }, {});
  }
);

export const selectRecentAssets = createSelector(
  selectAllAssetsData,
  (assets) => assets.slice(0, 5)
);
