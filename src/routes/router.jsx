import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../components/ErrorPage/Errorpage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Vendor from "../pages/Vendor/Vendor";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children: [
        {
            index: true,
            Component:Home,
        },
        {
          path: 'vendor',
          element:<PrivateRoute><Vendor></Vendor></PrivateRoute>
        }
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
        {
            path:'login',
            Component:Login,
        },
        {
            path:'register',
            Component:Register,
        }
    ]

  },
  {
    path:"/*",
    Component:ErrorPage,
  }
]);