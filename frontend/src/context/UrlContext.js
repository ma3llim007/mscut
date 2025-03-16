import { createContext } from "react";

const UrlContext = createContext({
    user: {},
    isAuthenticated: false,
});

export default UrlContext;
