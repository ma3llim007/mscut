import Header from "@/components/Header";
import { FacebookIcon, Instagram, LinkedinIcon, Twitter } from "lucide-react";
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
                <div className="w-full my-4 mx-auto">
                    <ul className="flex flex-wrap justify-center gap-3 items-center">
                        <li className="bg-[#1877F2] p-2 rounded-lg hover:opacity-80 transition cursor-pointer">
                            <a target="_blank" href="https://www.facebook.com/Ma3llim007/" aria-label="Visit My Facebook">
                                <FacebookIcon className="text-white w-6 h-6" />
                            </a>
                        </li>
                        <li className="bg-black p-2 rounded-lg hover:opacity-80 transition cursor-pointer">
                            <a target="_blank" href="https://x.com/ma_3llim_007" aria-label="Visit My Twitter">
                                <Twitter className="text-white w-6 h-6" />
                            </a>
                        </li>
                        <li className="bg-gradient-to-r from-[#FCAF45] via-[#E1306C] to-[#C13584] p-2 rounded-lg hover:opacity-80 transition cursor-pointer">
                            <a target="_blank" href="https://www.instagram.com/ma_3llim_007/" aria-label="Visit My Instagram">
                                <Instagram className="text-white w-6 h-6" />
                            </a>
                        </li>
                        <li className="bg-[#0077B5] p-2 rounded-lg hover:opacity-80 transition cursor-pointer">
                            <a target="_blank" href="https://www.linkedin.com/in/mohdsameer-dev/" aria-label="Visit My LinkedIn">
                                <LinkedinIcon className="text-white w-6 h-6" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
