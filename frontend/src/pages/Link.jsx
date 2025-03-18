import crudService from "@/api/crudService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader, ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import DeviceStats from "./DeviceStats";
import Location from "@/components/Location";
import queryClient from "@/api/queryClientConfig";

const Link = () => {
    const [copied, setCopied] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, isLoading } = useQuery({
        queryKey: ["links", id],
        queryFn: () => crudService.get(`/urls/url/${id}`),
        enabled: !!id,
    });
    if (error) {
        const errorMessage = error?.response?.data?.message || error?.message || "An error occurred";
        toast.error(errorMessage);
    }
    const { url, clicks } = data?.data || {};
    let link = "";
    if (url) {
        link = url?.customUrl ? url?.customUrl : url.shortUrl;
    }

    const downloadImage = () => {
        const imageUrl = url?.qrCode;
        const fileName = url?.title;
        const achor = document.createElement("a");
        achor.href = imageUrl;
        achor.download = fileName;

        document.body.appendChild(achor);
        achor.click();

        document.body.removeChild(achor);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_HOST}/${url?.shortUrl}`);
            setCopied(true);
            toast.success("Copied to clipboard!");

            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error("Failed to copy!");
        }
    };

    const { mutate: deleteUrl, isPending } = useMutation({
        mutationFn: (id) => crudService.delete(`/urls/delete-url/${id}`),
        onSuccess: (data) => {
            queryClient.invalidateQueries("userUrls");
            toast.success(data?.message);
            navigate("/dashboard");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || error?.message || "An error occurred";
            toast.error(errorMessage);
        },
    });

    if (isLoading || isPending) return <ClipLoader size={60} color="white" />;
    return (
        <div className="flex flex-col gap-8 sm:flex-row justify-between">
            <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
                <span className="text-6xl font-extrabold hover:underline cursor-pointer">{url?.title}</span>
                <a href={`${import.meta.env.VITE_FRONTEND_HOST}/${link}`} target="_blank" className="text-3xl sm:text-4xl text-blue-500 font-bold hover:underline cursor-pointer">
                    {`${import.meta.env.VITE_FRONTEND_HOST}/${link}`}
                </a>
                <a href={url?.originalUrl} target="_blank" className="flex items-center gap-1 hover:underline cursor-pointer">
                    <LinkIcon className="p-1" />
                    {url?.originalUrl}
                </a>
                <span className="flex items-end font-extralight text-sm">{new Date(url?.createdAt).toLocaleString()}</span>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={handleCopy} className="relative transition duration-150 ease-in-out cursor-pointer">
                        {copied ? <Check className="text-green-500" /> : <Copy />}
                    </Button>
                    <Button className="cursor-pointer" variant="ghost" onClick={downloadImage}>
                        <Download />
                    </Button>
                    <Button className="cursor-pointer" variant="ghost" onClick={() => deleteUrl(id)}>
                        {isPending ? <BeatLoader size={5} color="white" /> : <Trash />}
                    </Button>
                </div>
                <img src={url?.qrCode} alt="Qr Code Image" className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain" />
            </div>
            <Card className="sm:w-3/5">
                <CardHeader>
                    <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
                </CardHeader>
                {clicks && clicks.length ? (
                    <CardContent className="flex flex-col gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Clicks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{clicks?.length}</p>
                            </CardContent>
                        </Card>

                        <CardTitle className="text-2xl font-extrabold underline">Location Data</CardTitle>
                        <Location stats={clicks} />
                        <CardTitle className="text-2xl font-extrabold underline">Device Info</CardTitle>
                        <DeviceStats stats={clicks} />
                    </CardContent>
                ) : (
                    <CardContent>{isLoading === false ? "No Statistics Yet" : "Loading Statistics...."}</CardContent>
                )}
            </Card>
        </div>
    );
};

export default Link;
