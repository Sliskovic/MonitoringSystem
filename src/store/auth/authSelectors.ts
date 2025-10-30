import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

const selectAuth = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
  selectAuth,
  (auth) => auth.user
);
export const selectToken = createSelector(selectAuth, (auth) => auth.token);
export const selectIsAuthenticated = createSelector(
  selectToken,
  (token) => !!token
);
