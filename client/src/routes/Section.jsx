import React, { Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useRoutes } from 'react-router-dom'; 

import LandingPage from "../pages/LandingPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/User/DashBoard/Dashboard";
import TruckerDashboard from "../pages/Trucker/TruckerDashboard";
import {Allorders} from "../pages/Trucker/Allorder/Allorders";
import {UserOrders} from "../pages/User/DashBoard/UserOrders";
import Commitment from "../pages/Trucker/Commitment/Commitment";

const ProtectedRoute = ({ element, role }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAuthenticated = !!user;
  const userRole = user ? user.role : -1;

  // Check if the user is authenticated and has the required role
  if (isAuthenticated && (userRole === role || userRole === 0)) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const Router = () => {
  const routes = useRoutes([
    {
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          path: 'cargoconnect',
          element: <ProtectedRoute element={<Dashboard />} role={2} />,
        },
        {
          path: 'truckerHome',
          element: <ProtectedRoute element={<TruckerDashboard />} role={1} />,
        },
        {
          path: 'allorders',
          element: <ProtectedRoute element={<Allorders />} role={1} />,
        },
        {
          path: 'commit',
          element: <ProtectedRoute element={<Commitment />} role={1} />,
        },
        {
          path: 'userorders',
          element: <ProtectedRoute element={<UserOrders />} role={2} />,
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/signup',
          element: <SignupPage />,
        },
      ],
    },
  ]);

  return routes;
};

export default Router;
