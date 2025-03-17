import { useNavigate, useSearchParams } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { BeatLoader } from "react-spinners";
import { yupResolver } from "@hookform/resolvers/yup";
import { createLinkValidationSchema } from "@/validation/url.validation";
import { Card } from "./ui/card";
import ErrorMessage from "./ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import crudService from "@/api/crudService";
import { toast } from "react-toastify";
import queryClient from "@/api/queryClientConfig";

const CreateLink = () => {
    const navigate = useNavigate();
    const [serachParams, setSearchParams] = useSearchParams();
    const longLink = serachParams.get("createNew");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        resetField,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(createLinkValidationSchema),
        defaultValues: {
            originalUrl: longLink ? longLink : "",
        },
    });

    const { mutate,isPending } = useMutation({
        mutationFn: (data) => crudService.post("urls/create-url", data),
        onError: (error) => {
            const message = error?.response?.data?.message || error?.message || "An Unexpected Error Occurred.";
            setError("root", { message });
            resetField("customUrl");
        },
        onSuccess: (data) => {
            const link = data?.data?._id;
            navigate(`/link/${link}`);
            toast.success(data?.message || "Link Created Successfully");
            queryClient.invalidateQueries("userUrls");
        },
    });
    return (
        <div>
            <Dialog
                defaultOpen={longLink}
                onOpenChange={(res) => {
                    if (!res) setSearchParams({});
                }}
            >
                <DialogTrigger asChild>
                    <Button className="bg-red-500 text-white hover:bg-red-600 transition-all delay-100 cursor-pointer duration-300 ease-in-out">Create New Link</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                        <DialogDescription className="text-base">Enter the details to create a new shortened link.</DialogDescription>
                    </DialogHeader>
                    {errors.root && (
                        <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                            <p className="text-white font-bold text-sm">{errors.root.message}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit(mutate)} className="space-y-3">
                        <div>
                            <Input
                                {...register("title")}
                                type="text"
                                disabled={isPending}
                                placeholder="Title"
                                className="!text-lg rounded py-5 px-2 border mb-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            {errors?.title?.message ? <ErrorMessage error={errors?.title?.message} /> : null}
                        </div>
                        <div>
                            <Input
                                {...register("originalUrl")}
                                type="url"
                                disabled={isPending}
                                placeholder="Original Url"
                                className="!text-lg rounded py-5 px-2 border mb-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            {errors?.originalUrl?.message ? <ErrorMessage error={errors?.originalUrl?.message} /> : null}
                        </div>
                        <div className="w-full">
                            <div className="flex items-center gap-2">
                                <Card className="p-2 max-w-fit text-nowrap rounded border mb-1 border-gray-300">{import.meta.env.VITE_FRONTEND_HOST}</Card> /
                                <Input
                                    {...register("customUrl")}
                                    type="text"
                                    disabled={isPending}
                                    placeholder="Custom Url (Optional)"
                                    className="!text-lg rounded py-5 px-2 border mb-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                            </div>
                            {errors?.customUrl?.message ? <ErrorMessage error={errors?.customUrl?.message} /> : null}
                        </div>
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md flex items-center justify-center cursor-pointer"
                        >
                            {isPending ? <BeatLoader size={10} color="#ffffff" /> : "Create"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateLink;
