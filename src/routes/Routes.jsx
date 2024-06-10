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
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import MyProfile from "../pages/Dashboard/Guest/MyProfile";
import RequestedMeals from "../pages/Dashboard/Guest/RequestedMeals";
import MyReviews from "../pages/Dashboard/Guest/MyReviews";
import PaymentHistory from "../pages/Dashboard/Guest/PaymentHistory";
import Membership from "../pages/Home/Membership/Membership";
import UpcomingMealsAdmin from "../pages/Dashboard/Admin/UpcomingMealsAdmin";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
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
                element: <PrivateRoute><MealDetails /></PrivateRoute>,
            },
            {
                path: "/upcoming-meals",
                element: <UpcomingMeals />,
            },
            {
                path: "/checkout",
                element: <PrivateRoute><Membership /></PrivateRoute>,
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
        element: <AdminRoute><UpdateMeal /></AdminRoute>
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "manage-users",
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: "add-meal",
                element: <AdminRoute><AddMeal /></AdminRoute>
            },
            {
                path: "all-meals",
                element: <AdminRoute><AllMeals /></AdminRoute>
            },
            {
                path: "all-reviews",
                element: <AdminRoute><AllReviews /></AdminRoute>
            },
            {
                path: "serve-meals",
                element: <AdminRoute><ServeMeals /></AdminRoute>
            },
            {
                path: "upcoming-meals",
                element: <AdminRoute><UpcomingMeals /></AdminRoute>
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
            {
                path: "upcoming-meals-admin",
                element: <AdminRoute><UpcomingMealsAdmin /></AdminRoute>
            },
        ]
    }
]);