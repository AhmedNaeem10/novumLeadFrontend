import { createBrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import { ROUTE_CONSTANTS } from "../constants/RouteConstants";
import { Analytics } from "../pages/Analytics";
import { App } from "../pages/App";
import { Bookings } from "../pages/Bookings";
import { ErrorPage } from "../pages/ErrorPage";
import { Login } from "../pages/Login";
import { Projects } from "../pages/Projects";

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
                path: ROUTE_CONSTANTS.ANALYTICS,
                element:
                    <>
                        <Header />
                        <Analytics />
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