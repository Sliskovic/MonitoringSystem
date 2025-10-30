import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
} from "@/store/auth/authConstants";
import { logout, setCredentials } from "./authState";

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
  actionCreator: setCredentials,
  effect: (action) => {
    const { token, refreshToken, user } = action.payload;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    if (refreshToken)
      localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
    else localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
    if (user !== undefined) {
      if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(AUTH_USER_KEY);
    }
  },
});

authMiddleware.startListening({
  actionCreator: logout,
  effect: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },
});
