import UrlContext from "@/context/UrlContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, isAuthenticated } = useContext(UrlContext);
    console.log(user);

    // if (isLoading) return <div>Loading...</div>; // Show while checking session

    // return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
    return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
