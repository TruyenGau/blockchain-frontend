import { createContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        name: "",
        address: "",
        role: ""
    },
    appLoading: true,
    dappazon: null, // Thêm dappazon
    provider: null  // Thêm provider
});

export const AuthWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            email: "",
            name: "",
            address: "",
            role: ""
        }
    });
    const [appLoading, setAppLoading] = useState(true);
    const [dappazon, setDappazon] = useState(null); // Thêm dappazon
    const [provider, setProvider] = useState(null); // Thêm provider

    return (
        <AuthContext.Provider value={{
            auth, setAuth, appLoading, setAppLoading, dappazon, setDappazon, provider, setProvider
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};
