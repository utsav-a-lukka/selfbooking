import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import DefaultRoute from './Guards/DefaultRoute';
import UserLayout from './Layout/UserLayout';
import AdminLayout from './Layout/AdminLayout';
import UserDashboard from './Pages/UserLayout/Dashboard';
import AdminDashboard from './Pages/AdminLayout/Dashboard';
import MyBookings from './Pages/UserLayout/MyBookings';
import UserEvent from './Pages/UserLayout/Event';
import AdminEvent from './Pages/AdminLayout/Event';
import Profile from './Pages/UserLayout/Profile';
import Booking from './Pages/AdminLayout/Booking';

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
     {
      path: "/register",
      element: <Register />
    },
    {
      path:"/",
      element: <DefaultRoute />
    },

    // User Routes
    {
      path:"user",
      element: <UserLayout />,
      children: [
        {path: "dashboard", element: <UserDashboard />},
        {path: "my-bookings", element: <MyBookings />},
        {path: "event", element: <UserEvent />},
        {path: "profile", element: <Profile/> }
      ]
    },

    // admin routes
    {
      path:"admin",
      element: <AdminLayout />,
      children: [
        {path: "dashboard", element: <AdminDashboard/>},
        {path: "bookings", element: <Booking />},
        {path: "event", element: <AdminEvent />},
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App
