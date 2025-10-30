import { isAnyOf, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { AssetsUIState } from "./assetsState";
import { assetsApi } from "@/api/assetsApi";

export const registerAssetsExtraReducers = (
  builder: ActionReducerMapBuilder<AssetsUIState>
) => {
  builder.addMatcher(
    isAnyOf(
      assetsApi.endpoints.createAsset.matchFulfilled,
      assetsApi.endpoints.updateAsset.matchFulfilled,
      assetsApi.endpoints.deleteAsset.matchFulfilled
    ),
    (state) => {
      state.selectedIds = [];
    }
  );
};
