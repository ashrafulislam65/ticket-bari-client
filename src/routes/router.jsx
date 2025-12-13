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

import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import TransactionHistory from "../pages/Dashboard/TransactionHistory/TransactionHistory";
import Vendor from "../pages/Vendor/Vendor";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import RequestedBookings from "../pages/Vendor/RequestedBookings";
import AdminRoute from "./AdminRoute";
import AdminManageTickets from "../pages/Dashboard/AdminManageTickets.jsx/AdminManageTickets";
import VendorMyTickets from "../pages/Vendor/VendorMyTickets";
import AdminAdvertiseTickets from "../pages/Dashboard/AdminAdvertiseTickets/AdminAdvertiseTickets";
import RevenueOverview from "../pages/Vendor/RevenueOverview";


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
        path:'vendor',
        element:<PrivateRoute><Vendor></Vendor></PrivateRoute>
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
        path: 'payment/:ticketId',
        Component: Payment,

      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,

      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled,

      },
      {
        path: "transactions",
        Component: TransactionHistory
      },
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'manage-tickets',
        element: <AdminRoute><AdminManageTickets></AdminManageTickets></AdminRoute>
      },
      {
        path: "advertise-tickets",
        element: <AdminRoute><AdminAdvertiseTickets></AdminAdvertiseTickets></AdminRoute>,

      },
      {
        path: "add-ticket",
        element: (
          <AddTicket></AddTicket>
        ),
      },
      {
        path: 'vendor-tickets',
        element:<VendorMyTickets></VendorMyTickets>


      },
      { 
        path: 'revenue-overview',
        element: <RevenueOverview></RevenueOverview>

      },
      {
        path: 'requested-bookings',
        element: <RequestedBookings></RequestedBookings>,
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