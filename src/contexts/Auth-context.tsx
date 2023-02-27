import React, {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from "react";

type AuthContextType = {
    user: { [key: string]: any } | null;
    setUser: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// helper function to get the Auth Context using React's useContext hook
const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used wihin an AuthProvider.");
    }
    return context;
};

// define the AuthProvider, component that will wrap our application and hold the auth context
const AuthProvider = (props: { children: ReactNode }): ReactElement => {
    const [user, setUser] = useState<{ [key: string]: any } | null>(null);

    return (
        <AuthContext.Provider
            {...props}
            value={{
                user: user,
                setUser: setUser
            }}
        />
    );
};

export { AuthProvider, useAuth };
