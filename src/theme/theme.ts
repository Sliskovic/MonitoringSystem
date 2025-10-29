import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    colorInfo: "#1890ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    borderRadius: 4,
  },
  components: {
    Layout: {
      headerBg: "#001529",
      siderBg: "#001529",
      padding: 0,
      margin: 0,
    },
    Button: {},
  },
};
