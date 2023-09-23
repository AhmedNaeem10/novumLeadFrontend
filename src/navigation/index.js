import { createBrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import { ROUTE_CONSTANTS } from "../constants/RouteConstants";
import { Accounts } from "../pages/Accounts";
import { App } from "../pages/App";
import { Bookings } from "../pages/Bookings";
import { Dashboard } from "../pages/Dashboard";
import { ErrorPage } from "../pages/ErrorPage";
import { Login } from "../pages/Login";
import { Projects } from "../pages/Projects";
import { Users } from "../pages/Users";

export const routes = [
    {
        errorElement: <>
            <ErrorPage />
        </>,

        children: [
            {
                path: ROUTE_CONSTANTS.LOGIN,
                element: <Login />,
            },
            {
                path: ROUTE_CONSTANTS.DASHBOARD,
                element:
                    <>
                        <Header />
                        <Dashboard />
                    </>,
            },
            {
                path: ROUTE_CONSTANTS.ACCOUNTS,
                element:
                    <>
                        <Header />
                        <Accounts />
                    </>,
            },
            {
                path: ROUTE_CONSTANTS.USERS,
                element:
                    <>
                        <Header />
                        <Users />
                    </>,
            },
            {
                path: ROUTE_CONSTANTS.BASE,
                element: <App />,
            },
            {
                path: ROUTE_CONSTANTS.BOOKINGS,
                element:
                    <>
                        <Header />
                        <Bookings />
                    </>,
            },
            {
                path: ROUTE_CONSTANTS.PROJECTS,
                element:
                    <>
                        <Header />
                        <Projects />
                    </>,
            },
        ]
    },
]

export const router = createBrowserRouter(routes);