import crudService from "@/api/crudService";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["authStatus"],
        queryFn: () => crudService.get("user/checks-session"),
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    return { data, isLoading, isError };
};

export default useAuth;
