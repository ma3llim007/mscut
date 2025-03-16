import { useState } from "react";
import UrlContext from "./UrlContext";

const UrlContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const userLogin = (userdata) => {
        setUser(userdata);
        setIsAuthenticated(true);
    };

    const userLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return <UrlContext.Provider value={{ user, isAuthenticated, userLogin, userLogout }}>{children}</UrlContext.Provider>;
};

export default UrlContextProvider;
