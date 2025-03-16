import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ErrorMessage from "./ErrorMessage";
import { loginValidationSchema } from "@/validation/auth.validation";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange", resolver: yupResolver(loginValidationSchema) });
    const [loading, setLoading] = useState(false);
    const loginUser = async (data) => {
        setLoading(true);
        try {
            console.log(data);
            // Simulate login process
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } finally {
            setLoading(false);
        }
    };
    return (
        <Card className="w-full max-w-md shadow-lg rounded-lg text-white">
            <CardHeader className="mb-4 text-center">
                <CardTitle className="text-3xl font-bold">Login</CardTitle>
                <CardDescription className="text-gray-400">Access your account by logging in below</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(loginUser)} className="w-full space-y-3">
                    <div>
                        <Input
                            {...register("email")}
                            type="email"
                            disabled={loading}
                            placeholder="Email Address"
                            className="!text-lg rounded p-5 border mb-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        {errors?.email?.message ? <ErrorMessage error={errors?.email?.message} /> : null}
                    </div>
                    <div>
                        <Input
                            {...register("password")}
                            type="password"
                            placeholder="Password"
                            disabled={loading}
                            className="!text-lg rounded p-5 border mb-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        {errors?.password?.message ? <ErrorMessage error={errors?.password?.message} /> : null}
                    </div>
                    <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md flex items-center justify-center" disabled={loading}>
                        {loading ? <BeatLoader size={10} color="#ffffff" /> : "Login"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                    Sign up
                </a>
            </CardFooter>
        </Card>
    );
};

export default Login;
