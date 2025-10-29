import type { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ConfigProvider } from "antd";
import { theme } from "../theme/theme";
import { store } from "../store/store";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ConfigProvider theme={theme}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ConfigProvider>
  );
};
