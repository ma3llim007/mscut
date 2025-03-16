import { createContext } from "react";

const UrlContext = createContext({
    user: {},
    isAuthenticated: false,
    userLogin: () => {},
    userLogout: () => {},
});

export default UrlContext;
