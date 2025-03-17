import crudService from "@/api/crudService";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";

const Redirect = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch the URL details (original URL)
    const { data, isPending, isError } = useQuery({
        queryKey: ["redirect", id],
        queryFn: () => crudService.get(`/urls/redirect/${id}`),
        enabled: !!id,
    });

    const { mutate } = useMutation({
        mutationFn: () => crudService.post(`/urls/stock-click/${data?.data?._id}`, { originalUrl: data?.data?.originalUrl }),
        onError: (error) => {
            const message = error?.response?.data?.message || error?.message || "An Unexpected Error Occurred.";
            toast.error(message);
        },
    });

    // Automatically track visit & redirect
    useEffect(() => {
        if (data?.data?.originalUrl) {
            mutate();
            setTimeout(() => {
                window.location.href = data.data.originalUrl;
            }, 500);
        }
    }, [data]);

    // Handle errors
    useEffect(() => {
        if (isError) {
            toast.error("URL not found or invalid.");
            navigate("/");
        }
    }, [isError, navigate]);

    return <div>{isPending && <BarLoader width={"100%"} color="white" />}</div>;
};

export default Redirect;
