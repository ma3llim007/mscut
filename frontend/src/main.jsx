import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClientConfig";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

import "./index.css";
import UrlContextProvider from "./context/UrlContextProvider";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <UrlContextProvider>
                <RouterProvider router={router} />
            </UrlContextProvider>
        </QueryClientProvider>
    </StrictMode>
);
