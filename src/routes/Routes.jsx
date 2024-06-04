import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Meals from "../pages/Meals/Meals";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";



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
]);