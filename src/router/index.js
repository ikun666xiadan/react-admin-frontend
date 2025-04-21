import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("../pages/Layout"));
const Home = lazy(() => import("../pages/Home"));
const Goods = lazy(() => import("../pages/Goods"));
const User = lazy(() => import("../pages/User"));
const Other = lazy(() => import("../pages/Other"));
const LogLogin = lazy(() => import("../pages/Other/LogLogin"));
const LogActions = lazy(() => import("../pages/Other/LogActions"));
const Login = lazy(() => import("../pages/Login"));
const UserCenter = lazy(() => import("../pages/UserCenter"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // 路由重定向
      {
        path: "/",
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: (
          <Suspense fallback={"loading..."}>
            <Home />{" "}
          </Suspense>
        ),
      },
      {
        path: "goods",
        element: (
          <Suspense fallback={"loading..."}>
            <Goods />{" "}
          </Suspense>
        ),
      },
      {
        path: "user",
        element: (
          <Suspense fallback={"loading..."}>
            <User />{" "}
          </Suspense>
        ),
      },
      {
        path: "log",
        element: (
          <Suspense fallback={"loading..."}>
            <Other />{" "}
          </Suspense>
        ),
        children: [
          {
            path: "logLogin",
            element: (
              <Suspense fallback={"loading..."}>
                <LogLogin />{" "}
              </Suspense>
            ),
          },
          {
            path: "logActions",
            element: (
              <Suspense fallback={"loading..."}>
                <LogActions />{" "}
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: (
      <Suspense fallback={"loading..."}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "userCenter",
    element: (
      <Suspense fallback={"loading..."}>
        <UserCenter />
      </Suspense>
    ),
  },
]);

export default router;
