import { createSlice } from "@reduxjs/toolkit";
import { dashboardReducers } from "./dashboardReducers";

export interface Widget {
  id: string;
  type: "chart" | "metric" | "table";
  title: string;
  data: any;
  position: { x: number; y: number; width: number; height: number };
}

export interface DashboardState {
  isLoading: boolean;
  widgets: Widget[];
  selectedTimeRange: string;
  refreshInterval: number;
  error: string | null;
}

const initialState: DashboardState = {
  isLoading: false,
  widgets: [],
  selectedTimeRange: "1h",
  refreshInterval: 30000,
  error: null,
};

const dashboardState = createSlice({
  name: "dashboard",
  initialState,
  reducers: dashboardReducers,
});

export const {
  setLoading,
  addWidget,
  removeWidget,
  updateWidget,
  setTimeRange,
  setRefreshInterval,
  setError,
} = dashboardState.actions;

export default dashboardState.reducer;
