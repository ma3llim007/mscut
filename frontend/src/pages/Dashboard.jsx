import crudService from "@/api/crudService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useSelector((state) => state.userAuth);

    const { data:UrlData, error, isPending } = useQuery({
        queryKey: ["userUrls", user?._id],
        queryFn: () => crudService.get("/urls/get-urls"),
    });

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Links Created</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>0</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>0</p>
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
        </div>
    );
};

export default Dashboard;
