import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../components/ErrorPage/Errorpage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";

import BookTicket from "../pages/BookTicket/BookTicket";
import AllTickets from "../pages/AllTickets/AllTickets";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import MyBookedTickets from "../pages/Dashboard/MyBookedTickets/MyBookedTickets";
import AddTicket from "../pages/Vendor/AddTicket";
import MyAddedTickets from "../pages/Vendor/MyAddedTickets";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'all-tickets',
        element: <PrivateRoute><AllTickets></AllTickets></PrivateRoute>

      },
      {
        path: 'ticket/:id',
        element: <PrivateRoute><TicketDetails></TicketDetails></PrivateRoute>
      },
     
      {
        path: 'book-ticket',
        element: <PrivateRoute><BookTicket></BookTicket></PrivateRoute>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'my-booked-tickets',
        Component: MyBookedTickets,
      },
      {
        path: "add-ticket",
        element: (
          <AddTicket></AddTicket>
        ),
      },
      {
        path: 'my-added-tickets',
        element: <MyAddedTickets></MyAddedTickets>,
      }
    ]

  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      }
    ]

  },
  {
    path: "/*",
    Component: ErrorPage,
  }
]);