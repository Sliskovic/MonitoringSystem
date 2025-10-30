import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./authState";

export const authReducers = {
  setCredentials: (
    state: AuthState,
    action: PayloadAction<{
      token: string;
      user?: User;
      refreshToken?: string | null;
    }>
  ) => {
    state.token = action.payload.token;
    state.user = action.payload.user ?? state.user;
    state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
  },
  logout: (state: AuthState) => {
    state.token = null;
    state.refreshToken = null;
    state.user = null;
  },
};
