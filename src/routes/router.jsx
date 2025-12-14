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
import VendorRoute from "./VendorRoute";
import UserProfile from "../pages/Dashboard/UserProfile";
import VendorProfile from "../pages/Vendor/VendorProfile";
import AdminProfile from "../pages/Dashboard/AdminProfile";


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
         path: 'profile',
         Component: UserProfile,
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
        path: 'admin-profile',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      
      {
        path: "add-ticket",
        element: <VendorRoute><AddTicket></AddTicket></VendorRoute>
        ,
      },
      {
        path: 'vendor-tickets',
        element:<VendorRoute><VendorMyTickets></VendorMyTickets></VendorRoute>


      },
      { 
        path: 'revenue-overview',
        element: <VendorRoute><RevenueOverview></RevenueOverview></VendorRoute>

      },
      {
        path: 'requested-bookings',
        element: <VendorRoute><RequestedBookings></RequestedBookings></VendorRoute>,
      },
      { 
          path: 'vendor-profile',
          element: <VendorRoute><VendorProfile></VendorProfile></VendorRoute>

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