import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import AssetsPage from "./features/assets/AssetPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/assets", element: <AssetsPage /> },
    ],
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
