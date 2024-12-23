import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./Pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout/UserLayout";
import Login from "./Auth/Login/Login";
import Signup from "./Auth/SignUp/Signup";
import { AuthProvider } from "./AuthProvider/AuthContext";
import Profile from "./Pages/Profile/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ProfileLayoyt from "./Layouts/UserLayout/ProfileLayoyt";
import DashboardLayout from "./Layouts/AdminLayout/DashboardLayout";
import Dashboard from "./Pages/Dashboard/DashBoard/Dashboard";
import AddBusSchedule from "./Pages/Dashboard/AddBusSchedule/AddBusSchedule";
import Bus from "./Pages/SearchResult/Bus";

import PackageForm from "./Pages/PackageForm/PackageForm";
import PackageDetails from './Pages/PackageDetails/PackageDetails';
import AccessoriesForm from "./Pages/Dashboard/AccessoriesForm/AccessoriesForm";
import AddTourGuider from "./Pages/Dashboard/AddTourGider/AddTourGuider";
import Packages from "./Pages/Packages/Packages";
import { AccessoriesDetails } from "./Pages/AccessoriesDetails/AccessoriesDetails";
import Flight from "./Pages/SearchResult/Flight";
import Train from "./Pages/SearchResult/Train";
import TourGuideDetails from "./Pages/TourGuideDetails/TourGuideDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout></UserLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/busSearchResult",
        element: <Bus></Bus>,
      },
      {
        path: "/flightSearchResult",
        element: <Flight/>,
      },
      {
        path: "/trainSearchResult",
        element: <Train/>,
      },
      {
        path: "/packages",
        element: <Packages></Packages> ,
      },
      {
        path: "/package/:id",
        element: <PackageDetails></PackageDetails>,
      },
      {
        path: "/Accessories/:id/:catagory",
        element: <AccessoriesDetails/> ,
      },
      {
        path: "/guider/:id",
        element: <TourGuideDetails/> ,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfileLayoyt></ProfileLayoyt>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/profile",
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
          {
            path: "/profile/:userId/edit",
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/AddBusSchedule",
        element: <AddBusSchedule />,
      },
      {
        path: "/dashboard/AddPackage",
        element: <PackageForm />,
      },
      {
        path: "/dashboard/AddAccessries",
        element: <AccessoriesForm />,
      },
      {
        path: "/dashboard/AddTourGuider",
        element: <AddTourGuider/> ,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
);

reportWebVitals();
