import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import AppLayout from "@/layouts/AppLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
const Auth = lazy(() => import("../pages/Auth"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Landing = lazy(() => import("../pages/Landing"));
const Link = lazy(() => import("../pages/Link"));
const Redirect = lazy(() => import("../pages/Redirect"));

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<ClipLoader size={60} color="white" />}>
                        <Landing />
                    </Suspense>
                ),
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/dashboard",
                        element: (
                            <Suspense fallback={<ClipLoader size={60} color="white" />}>
                                <Dashboard />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: "/auth",
                element: (
                    <Suspense fallback={<ClipLoader size={60} color="white" />}>
                        <Auth />
                    </Suspense>
                ),
            },
            {
                path: "/link/:id",
                element: (
                    <Suspense fallback={<ClipLoader size={60} color="white" />}>
                        <Link />
                    </Suspense>
                ),
            },
            {
                path: "/:id",
                element: (
                    <Suspense fallback={<ClipLoader size={60} color="white" />}>
                        <Redirect />
                    </Suspense>
                ),
            },
        ],
    },
]);

export default router;
