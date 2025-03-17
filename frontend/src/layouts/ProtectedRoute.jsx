import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
    const { user, isAuthenticated } = useSelector((state) => state.userAuth);

    useEffect(() => {
        if (!user || !isAuthenticated) {
            toast.error("You Need To LogIn To Access This Page.");
        }
    }, [user, isAuthenticated]);

    return user && isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
