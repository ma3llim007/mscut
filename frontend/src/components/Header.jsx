import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import crudService from "@/api/crudService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "@/features/userAuthSlice";

const Header = () => {
    const { isAuthenticated } = useSelector((state) => state.userAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutate: logOutUser } = useMutation({
        mutationFn: () => crudService.post("user/log-out"),
        onError: (error) => {
            const message = error?.response?.data?.message || error?.message || "An Unexpected Error Occurred.";
            toast.error(message);
        },
        onSuccess: (data) => {
            dispatch(userLogOut());
            toast.success(data?.message || "Logout Successfully! See You Soon!");
            navigate("/");
        },
    });

    return (
        <nav className="py-4 flex justify-between items-center">
            <Link to={"/"}>
                <img src="/vite.svg" className="h-12" alt="Logo Image" />
            </Link>
            <div>
                {!isAuthenticated ? (
                    <Button className={"cursor-pointer"} onClick={() => navigate("/auth")}>
                        Login
                    </Button>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-0 overflow-hidden">
                            <Avatar>
                                <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                                <AvatarFallback>US</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Username</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LinkIcon /> My Links
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500" onClick={logOutUser}>
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
