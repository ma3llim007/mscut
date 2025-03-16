import crudService from "@/api/crudService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    console.log(navigate);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["authStatus"],
        queryFn: () => crudService.get("user/check-session"),
        retry: false,
        staleTime: 5 * 60 * 1000,
        onError: (error) => console.log(error.message || "Error checking authentication status"),
    });

    return { data, isLoading, isError };
};

export default useAuth;
