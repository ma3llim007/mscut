import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// File Import
import AppLayout from "./layouts/AppLayout";
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Link = lazy(() => import("./pages/Link"));
const Redirect = lazy(() => import("./pages/Redirect"));

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: (
                    <Suspense>
                        <Landing />
                    </Suspense>
                ),
            },
            {
                path: "/dashboard",
                element: (
                    <Suspense>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: "/auth",
                element: (
                    <Suspense>
                        <Auth />
                    </Suspense>
                ),
            },
            {
                path: "/link/:id",
                element: (
                    <Suspense>
                        <Link />
                    </Suspense>
                ),
            },
            {
                path: "/:id",
                element: (
                    <Suspense>
                        <Redirect />
                    </Suspense>
                ),
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
