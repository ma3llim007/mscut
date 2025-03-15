import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [longUrl, setLongUrl] = useState();
    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault();

        if (longUrl) {
            navigate(`/auth?createNew=${longUrl}`);
        }
    };
    return (
        <div className="flex flex-col items-center">
            <h1 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-center font-extrabold leading-20">
                The Only URL Shortener <br /> You&rsquo;ll Ever Need!
            </h1>
            <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
                <Input type="url" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} placeholder="Enter Your Long URL" className="h-full flex-1 p-4 !text-lg" />
                <Button className="h-full bg-red-600 hover:bg-red-500 transition duration-300 ease-in-out cursor-pointer text-lg" type="submit" variant="destructive">
                    Shorten!
                </Button>
            </form>
            <img src="/banner.jpeg" alt="Banner Image" className="w-full my-11 md:px-11" />
            <Accordion type="multiple" collapsible className="w-full md:px-11">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How does the [Website] URL shortener works?</AccordionTrigger>
                    <AccordionContent>
                        When you enter a long URL, our system generates a shorter version of that URL. This shortened URL redirects to the original long URL when accessed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
                    <AccordionContent>Yes. Creating an account allows you to manage your URLs, view analytics, and customize your short URLs.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What analytics are available for my shortened URLs?</AccordionTrigger>
                    <AccordionContent>You can view the number of clicks, geolocation data of the clicks and device types (mobile/desktop) for each of your shortened URLs.</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default LandingPage;
