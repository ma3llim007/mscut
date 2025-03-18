import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "@/validation/auth.validation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ErrorMessage from "./ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import crudService from "@/api/crudService";
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm({ mode: "onChange", resolver: yupResolver(registerValidationSchema) });
    const [message, setMessage] = useState(null);

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => crudService.post("user/register", data),
        onError: (error) => {
            const message = error.response?.data?.message || "An unexpected error occurred.";
            reset();
            setError("root", { message });
        },
        onSuccess: (data) => {
            setMessage(data?.message);
            reset();
        },
    });

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 15000);

            return () => clearTimeout(timer);
        }
    }, [message]);
    return (
        <Card className="w-full max-w-md shadow-lg rounded-lg text-white">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Signup</CardTitle>
                <CardDescription className="text-gray-400">Create An Account To Get Started</CardDescription>
            </CardHeader>
            <CardContent>
                {errors.root && (
                    <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                        <p className="text-white font-bold text-sm">{errors.root.message}</p>
                    </div>
                )}
                {message && (
                    <div className="w-full my-2 bg-green-600 text-center rounded-md border-2 border-green-800 py-2 px-4">
                        <p className="text-white font-bold text-base">{message}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit(mutate)} className="w-full space-y-3">
                    <div>
                        <Input
                            {...register("firstName")}
                            type="text"
                            disabled={isPending}
                            placeholder="First Name"
                            className="!text-lg rounded py-5 px-2 border mb-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        {errors?.firstName?.message ? <ErrorMessage error={errors?.firstName?.message} /> : null}
                    </div>
                    <div>
                        <Input
                            {...register("lastName")}
                            type="text"
                            disabled={isPending}
                            placeholder="Last Name"
                            className="!text-lg rounded py-5 px-2 border mb-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        {errors?.lastName?.message ? <ErrorMessage error={errors?.lastName?.message} /> : null}
                    </div>
                    <div>
                        <Input
                            {...register("email")}
                            type="email"
                            disabled={isPending}
                            placeholder="Email Address"
                            className="!text-lg rounded py-5 px-2 border mb-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        {errors?.email?.message ? <ErrorMessage error={errors?.email?.message} /> : null}
                    </div>
                    <div>
                        <Input
                            {...register("password")}
                            type="password"
                            placeholder="Password"
                            disabled={isPending}
                            className="!text-lg rounded py-5 px-2 border mb-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        {errors?.password?.message ? <ErrorMessage error={errors?.password?.message} /> : null}
                    </div>
                    <div>
                        <Input
                            {...register("confirmPassword")}
                            type="password"
                            placeholder="Confirm Password"
                            disabled={isPending}
                            className="!text-lg rounded py-5 px-2 border mb-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        {errors?.confirmPassword?.message ? <ErrorMessage error={errors?.confirmPassword?.message} /> : null}
                    </div>
                    <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md flex items-center justify-center cursor-pointer">
                        {isPending ? <BeatLoader size={10} color="#ffffff" /> : "Signup"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default Signup;
