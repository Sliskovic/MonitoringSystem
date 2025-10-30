import { createSlice } from "@reduxjs/toolkit";
import {
  AUTH_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_USER_KEY,
} from "./authConstants";
import { authReducers } from "./authReducers";

export type User = {
  id: string;
  username: string;
  role: string;
  email: string;
};

export type AuthState = {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
};

const getUserFromStorage = (): User | null => {
  const userString = localStorage.getItem(AUTH_USER_KEY);
  if (!userString) return null;
  try {
    return JSON.parse(userString);
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
};

const initialState: AuthState = {
  token: localStorage.getItem(AUTH_TOKEN_KEY),
  refreshToken: localStorage.getItem(AUTH_REFRESH_TOKEN_KEY),
  user: getUserFromStorage(),
};

const authState = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: authReducers,
});

export const { setCredentials, logout } = authState.actions;
export default authState.reducer;
