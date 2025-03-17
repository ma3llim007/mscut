import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="min-h-screen w-full flex flex-col !overflow-x-hidden">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <div className="p-10 text-center bg-gray-800 mt-10">
                <h6 className="text-xl font-bold">Made With 💖 By Mohd Sameer</h6>
            </div>
        </div>
    );
};

export default AppLayout;
