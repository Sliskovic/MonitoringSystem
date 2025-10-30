// src/services/baseApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store/store";
import { logout, setCredentials } from "@/store/auth/authState";

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return typeof error === "object" && error != null && "status" in error;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

let refreshPromise: Promise<void> | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (refreshPromise) {
    await refreshPromise;
  }

  let result = await rawBaseQuery(args, api, extraOptions);

  if (isFetchBaseQueryError(result.error) && result.error.status === 401) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const state = api.getState() as RootState;
        const { refreshToken } = state.auth;

        if (!refreshToken) {
          api.dispatch(logout());
          return;
        }

        const refreshResult = await rawBaseQuery(
          { url: "/auth/refresh", method: "POST", body: { refreshToken } },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const data = refreshResult.data as {
            token: string;
            refreshToken?: string;
          };
          api.dispatch(
            setCredentials({
              token: data.token,
              refreshToken: data.refreshToken,
            })
          );
        } else {
          api.dispatch(logout());
        }
      })().finally(() => {
        refreshPromise = null;
      });
    }

    await refreshPromise;
    result = await rawBaseQuery(args, api, extraOptions);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Assets", "Asset"],
  endpoints: () => ({}),
});
