import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const Login = lazy(() => import("../components/Login"));
const Signup = lazy(() => import("../components/Signup"));

const Auth = () => {
    const [searchParams] = useSearchParams();

    return (
        <div className="mt-10 flex flex-col items-center gap-10">
            {searchParams.get("createNew") ? "Hold Up! Let's Login First..." : null}
            <h1 className="text-5xl font-extrabold">Login / Signup</h1>
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Suspense fallback={<ClipLoader size={60} color="white" />}>
                        <Login />
                    </Suspense>
                </TabsContent>
                <TabsContent value="signup">
                    <Suspense fallback={<ClipLoader size={60} color="white" />}>
                        <Signup />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Auth;
