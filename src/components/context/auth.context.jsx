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

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}