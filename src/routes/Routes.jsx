import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Meals from "../pages/Meals/Meals";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AddMeal from "../pages/Dashboard/Admin/AddMeal";
import AllMeals from "../pages/Dashboard/Admin/AllMeals";
import AllReviews from "../pages/Dashboard/Admin/AllReviews";
import MealDetails from "../components/MealDetails/MealDetails";
import Checkout from "../pages/Checkout/Checkout";
import UpdateMeal from "../pages/UpdateMeal/UpdateMeal";
import ServeMeals from "../pages/Dashboard/Admin/ServeMeals";
import UpcomingMeals from "../pages/Dashboard/Admin/UpcomingMeals";
import MyProfile from "../pages/Dashboard/Guest/MyProfile";
import RequestedMeals from "../pages/Dashboard/Guest/RequestedMeals";
import MyReviews from "../pages/Dashboard/Guest/MyReviews";
import PaymentHistory from "../pages/Dashboard/Guest/PaymentHistory";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <div>Error 404</div>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/meals",
                element: <Meals />,
            },
            {
                path: "/meal-details/:id",
                element: <MealDetails />,
            },
            {
                path: "/upcoming-meals",
                element: <UpcomingMeals />,
            },

        ]
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/checkout/:package",
        element: <Checkout />,
    },
    {
        path: "/update-meal/:id",
        element: <PrivateRoute><UpdateMeal /></PrivateRoute>
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "manage-users",
                element: <PrivateRoute><ManageUsers /></PrivateRoute>
            },
            {
                path: "add-meal",
                element: <PrivateRoute><AddMeal /></PrivateRoute>
            },
            {
                path: "all-meals",
                element: <PrivateRoute><AllMeals /></PrivateRoute>
            },
            {
                path: "all-reviews",
                element: <PrivateRoute><AllReviews /></PrivateRoute>
            },
            {
                path: "serve-meals",
                element: <PrivateRoute><ServeMeals /></PrivateRoute>
            },
            {
                path: "upcoming-meals",
                element: <PrivateRoute><UpcomingMeals /></PrivateRoute>
            },
            {
                index: true,
                element: <PrivateRoute><MyProfile /></PrivateRoute>
            },
            {
                path: "requested-meals",
                element: <PrivateRoute><RequestedMeals /></PrivateRoute>
            },
            {
                path: "my-reviews",
                element: <PrivateRoute><MyReviews /></PrivateRoute>
            },
            {
                path: "payment-history",
                element: <PrivateRoute><PaymentHistory /></PrivateRoute>
            },
        ]
    }
]);