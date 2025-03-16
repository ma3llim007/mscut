import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();
    const user = false;

    return (
        <nav className="py-4 flex justify-between items-center">
            <Link to={"/"}>
                <img src="/vite.svg" className="h-12" alt="Logo Image" />
            </Link>
            <div>
                {!user ? (
                    <Button onClick={() => navigate("/auth")}>Login</Button>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-0 overflow-hidden">
                            <Avatar>
                                <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Username</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LinkIcon /> My Links
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                                <LogOut className="text-red-500" /> Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    );
};

export default Header;
