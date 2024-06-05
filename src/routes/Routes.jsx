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
        ]
    }
]);