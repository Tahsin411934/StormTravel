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
import { Shop } from "./Pages/Shop/Shop";
import { AccessoriesByCategory } from "./Pages/AccessoriesByCategory/AccessoriesByCategory";
import BuyTicket from "./Pages/BuyTicket/BuyTicket";
import { Booking } from "./Pages/Booking/Booking";
import { BookingConfirm } from "./Pages/BookingConfirm/BookingConfirm";
import { AccessoriesOrder } from "./Pages/AccessoriesOrder/AccessoriesOrder";
import { BookingTourGuider } from "./Pages/TourGuideDetails/BookingTourGuider";
import { BusTicketBooking } from "./Pages/BusTicketBooking/BusTicketBooking";
import AddFlightSchedule from "./Pages/Dashboard/AddFlight/AddFlightSchedule";
import AddTrainSchedule from "./Pages/Dashboard/AddTrainSchedule/AddTrainSchedule";
import { FlightTicketBooking } from "./Pages/FlightTicketBooking/FlightTicketBooking";
import { TrainTicketBooking } from "./Pages/TrainTicketBooking/TrainTicketBooking";
import { ConfirmTrainTicketBooking } from "./Pages/ConfirmTicketBooking/ConfirmTrainTicketBooking";
import PackagesTable from "./Pages/Dashboard/Packages/PackagesTable";
import AccessoriesTable from "./Pages/Dashboard/AccessoriesForm/AccessoriesTable";
import ShowTourGider from "./Pages/Dashboard/ShowTourGider/ShowTourGider";
import ShowBusSchedule from "./Pages/Dashboard/AddBusSchedule/ShowBusSchedule";
import FlightSchedule from "./Pages/Dashboard/AddFlight/FlightSchedule";
import TrainSchedule from "./Pages/Dashboard/TrainSchedule";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CategoriesTable from "./Pages/Dashboard/CategoriesTable/CategoriesTable";

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
        path: "/bus/:id",
        element: <BusTicketBooking></BusTicketBooking>,
      },
      {
        path: "/flightSearchResult",
        element: <Flight />,
      },
      {
        path: "/flight/:id",
        element: <FlightTicketBooking />,
      },
      {
        path: "/train/booking/:id",
        element: <ConfirmTrainTicketBooking />,
      },
      {
        path: "/train/:id",
        element: <TrainTicketBooking />,
      },
      {
        path: "/trainSearchResult",
        element: <Train />,
      },
      {
        path: "/packages",
        element: <Packages></Packages>,
      },
      {
        path: "/package/:id",
        element: <PackageDetails></PackageDetails>,
      },
      {
        path: "/Accessories/:id/:catagory",
        element: <AccessoriesDetails />,
      },
      {
        path: "/Accessories/:category",
        element: <AccessoriesByCategory />,
      },
      {
        path: "/Accessories/order-summary",
        element: <AccessoriesOrder />,
      },
      {
        path: "/booking/:type/:id",
        element: <Booking></Booking>,
      },
      {
        path: "/bookingConfirm/:id",
        element: <BookingConfirm />,
      },
      {
        path: "/guider/:id",
        element: <TourGuideDetails />,
      },
      {
        path: "/guider/booking/:id",
        element: <BookingTourGuider />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/buy-ticket",
        element: <BuyTicket />,
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
        path: "/dashboard/BusSchedule",
        element: <ShowBusSchedule />,
      },
      {
        path: "/dashboard/AddFlightSchedule",
        element: <AddFlightSchedule />,
      },
      {
        path: "/dashboard/FlightSchedule",
        element: <FlightSchedule />,
      },
      {
        path: "/dashboard/AddTrainSchedule",
        element: <AddTrainSchedule />,
      },
      {
        path: "/dashboard/TrainSchedule",
        element: <TrainSchedule />,
      },
      {
        path: "/dashboard/AddPackage",
        element: <PackageForm />,
      },
      {
        path: "/dashboard/showPackage",
        element: <PackagesTable />,
      },
      {
        path: "/dashboard/showAccessories",
        element: <AccessoriesTable />,
      },
      {
        path: "/dashboard/Categories",
        element: <CategoriesTable />,
      },
      {
        path: "/dashboard/ShowTourGuide",
        element: <ShowTourGider />,
      },
      {
        path: "/dashboard/AddAccessries",
        element: <AccessoriesForm />,
      },
      {
        path: "/dashboard/AddTourGuider",
        element: <AddTourGuider />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </Provider>
);

reportWebVitals();