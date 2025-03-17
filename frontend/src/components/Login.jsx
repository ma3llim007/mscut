import { BeatLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ErrorMessage from "./ErrorMessage";
import { loginValidationSchema } from "@/validation/auth.validation";
import { useMutation } from "@tanstack/react-query";
import crudService from "@/api/crudService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogin } from "@/features/userAuthSlice";

const Login = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        resetField,
    } = useForm({ mode: "onChange", resolver: yupResolver(loginValidationSchema) });
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => crudService.post("user/login", data),
        onError: (error) => {
            const message = error?.response?.data?.message || error?.message || "An Unexpected Error Occurred.";
            setError("root", { message });
            resetField("email");
            resetField("password");
        },
        onSuccess: (data) => {
            dispatch(userLogin(data?.data));
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            toast.success(data?.message || "Login Successfully");
        },
    });

    return (
        <Card className="w-full max-w-md shadow-lg rounded-lg text-white">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Login</CardTitle>
                <CardDescription className="text-gray-400">Access your account by logging in below</CardDescription>
            </CardHeader>
            <CardContent>
                {errors.root && (
                    <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                        <p className="text-white font-bold text-sm">{errors.root.message}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit((data) => mutate(data))} className="w-full space-y-3">
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
                    <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md flex items-center justify-center">
                        {isPending ? <BeatLoader size={10} color="#ffffff" /> : "Login"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default Login;
