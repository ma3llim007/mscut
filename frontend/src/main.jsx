import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClientConfig";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./router/router";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, storePersister } from "./store/store";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <PersistGate loading={null} persistor={storePersister}>
                    <RouterProvider router={router} />
                </PersistGate>
            </QueryClientProvider>
        </Provider>
        <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </StrictMode>
);
