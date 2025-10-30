import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import RequireAuth from "../features/auth/RequireAuth";

export const router = createBrowserRouter([
  // public
  {
    path: "/login",
    lazy: async () => {
      const { default: LoginPage } = await import("../features/auth/LoginPage");
      return { Component: LoginPage };
    },
  },

  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            index: true,
            lazy: async () => {
              const { DashboardPage } = await import(
                "../features/dashboard/DashboardPage"
              );
              return { Component: DashboardPage };
            },
          },
          {
            path: "dashboard",
            lazy: async () => {
              const { DashboardPage } = await import(
                "../features/dashboard/DashboardPage"
              );
              return { Component: DashboardPage };
            },
          },
          {
            path: "assets",
            lazy: async () => {
              const { default: AssetsPage } = await import(
                "../features/assets/AssetsPage"
              );
              return { Component: AssetsPage };
            },
          },
        ],
      },
    ],
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
