import { createContext, useState } from 'react';

export const AuthContext = createContext({
    id: "",
    email: "",
    name: "",
    role: ""
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        name: "",
        role: ""
    });

    const [isAppLoading, setIsAppLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}