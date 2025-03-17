import crudService from "@/api/crudService";
import queryClient from "@/api/queryClientConfig";
import LinkCard from "@/components/LinkCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { Filter } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useSelector((state) => state.userAuth);

    const {
        data: urls,
        error,
        isPending,
    } = useQuery({
        queryKey: ["userUrls", user?._id],
        queryFn: () => crudService.get("/urls/get-urls"),
        enabled: !!user?._id,
    });

    const { mutate: deleteUrl, isPending: deleteUrlIsPending } = useMutation({
        mutationFn: (id) => crudService.delete(`/urls/delete-url/${id}`),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["userUrls", user?._id]);
            toast.success(data?.message);
        },
        onError: (error) => {
            console.error(error);

            const errorMessage = error?.response?.data?.message || error?.message || "An error occurred";
            toast.error(errorMessage);
        },
    });

    // Extract the array of IDs from URLs
    const urlIds = urls?.data?.map((url) => url?._id) || [];

    // Fetch clicks for each ID using `useQueries`
    const clickQueriers = useQueries({
        queries: urlIds.map((id) => ({ queryKey: ["clickData", id], queryFn: () => crudService.get(`/click/click-by-urlid/${id}`) })),
        enabled: urlIds.length > 0,
    });

    // Extract the data from multiple queries
    const clickData = clickQueriers.map((query) => query.data || { data: [] });
    const totalClicks = clickData?.reduce((acc, obj) => acc + (obj?.data?.length || 0), 0);
    const isLoading = clickQueriers?.some((query) => query.isLoading);
    
    if (error) {
        toast.error(error?.response?.data?.message)
    }
    if (isPending || isLoading) return <ClipLoader size={60} color="white" />;
    const filteredUrls = urls?.data.filter((url) => url.title.toLowerCase().includes(searchQuery.toLowerCase()));

    if (deleteUrlIsPending || isPending) return <ClipLoader size={60} color="white" />;
    return (
        <div className="flex flex-col gap-8 mt-8">
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Links Created</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{urlIds.length || 0}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{totalClicks}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-between">
                <h1 className="text-4xl font-extrabold">My Links</h1>
                <Button>Create Link</Button>
            </div>
            <div className="relative">
                <Input type="text" placeholder="Filter Links..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Filter className="absolute top-2 right-2 p-1" />
            </div>
            {filteredUrls?.length > 0 ? (
                (filteredUrls || []).map((url, idx) => <LinkCard key={idx} url={url} fun={deleteUrl} isPending={deleteUrlIsPending} />)
            ) : (
                <div className="text-center text-gray-200 text-2xl font-bold p-6">No links found. Create a new link to get started!</div>
            )}
        </div>
    );
};

export default Dashboard;
