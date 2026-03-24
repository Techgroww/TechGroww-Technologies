import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardPage from "./Pages/DashboardPage";
import BlogsPage from "./Pages/BlogPage";
import BlogEditPage from "./Pages/BlogEditPage";
import PortfolioPage from "./Pages/PortfolioPage";
import PortfolioEditPage from "./Pages/PortfolioEditPage";
import JobsPage from "./Pages/JobsPage";
import JobEditPage from "./Pages/JobsEditPage";
import LeadsPage from "./Pages/LeadsPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },

      {
        path: "dashboard",
        element: <DashboardPage />
      },

      {
        path: "blogs",
        children: [
          {
            index: true,
            element: <BlogsPage />
          },
          {
            path: "new",
            element: <BlogEditPage />
          },
          {
            path: "edit/:id",
            element: <BlogEditPage />
          }
        ]
      },

      {
        path: "portfolio",
        children: [
          {
            index: true,
            element: <PortfolioPage />
          },
          {
            path: "new",
            element: <PortfolioEditPage />
          },
          {
            path: "edit/:id",
            element: <PortfolioEditPage />
          }
        ]
      },

      {
        path: "jobs",
        children: [
          {
            index: true,
            element: <JobsPage />
          },
          {
            path: "new",
            element: <JobEditPage />
          },
          {
            path: "edit/:id",
            element: <JobEditPage />
          }
        ]
      },

      {
        path: "leads",
        element: <LeadsPage />
      }

    ]
  }
]);