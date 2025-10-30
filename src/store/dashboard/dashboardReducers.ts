import type { PayloadAction } from "@reduxjs/toolkit";
import type { DashboardState, Widget } from "./dashboardState";

export const dashboardReducers = {
  setLoading: (state: DashboardState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
  addWidget: (state: DashboardState, action: PayloadAction<Widget>) => {
    state.widgets.push(action.payload);
  },
  removeWidget: (state: DashboardState, action: PayloadAction<string>) => {
    state.widgets = state.widgets.filter(
      (widget) => widget.id !== action.payload
    );
  },
  updateWidget: (
    state: DashboardState,
    action: PayloadAction<Partial<Widget> & { id: string }>
  ) => {
    const index = state.widgets.findIndex(
      (widget) => widget.id === action.payload.id
    );
    if (index !== -1) {
      state.widgets[index] = { ...state.widgets[index], ...action.payload };
    }
  },
  setTimeRange: (state: DashboardState, action: PayloadAction<string>) => {
    state.selectedTimeRange = action.payload;
  },
  setRefreshInterval: (
    state: DashboardState,
    action: PayloadAction<number>
  ) => {
    state.refreshInterval = action.payload;
  },
  setError: (state: DashboardState, action: PayloadAction<string | null>) => {
    state.error = action.payload;
  },
};
