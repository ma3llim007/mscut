import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <>
            <h1>Header</h1>
            <main className="min-h-screen container">
                <Outlet />
            </main>
            <div className="p-10 text-center bg-gray-800 mt-10">
                <p>Made With 💖 By Mohd Sameer</p>
            </div>
        </>
    );
};

export default AppLayout;
