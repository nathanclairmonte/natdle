import { View, Text } from "react-native";
import React, {
    ReactNode,
    ReactElement,
    useEffect,
    useState,
    createContext,
    Dispatch,
    SetStateAction
} from "react";
// import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import {
    useFonts,
    Amiko_400Regular,
    Amiko_600SemiBold,
    Amiko_700Bold
} from "@expo-google-fonts/amiko";
import { Auth } from "aws-amplify";

type AppBootstrapProps = {
    children: ReactNode;
};

type AuthContextType = {
    user: { [key: string]: any } | null;
    setUser: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
};

SplashScreen.preventAutoHideAsync();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement {
    const [fontLoaded] = useFonts({
        Amiko_400Regular,
        Amiko_600SemiBold,
        Amiko_700Bold
    });
    const [authLoaded, setAuthLoaded] = useState(false);
    const [user, setUser] = useState<{ [key: string]: any } | null>(null);

    useEffect(() => {
        const checkCurrentUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setUser(user);
            } catch (error) {
                // if there's an error just set user back to null (i.e. logout)
                setUser(null);
            }
            setAuthLoaded(true);
        };
        checkCurrentUser();
    }, []);

    useEffect(() => {
        const hideSplashScreen = async () => {
            if (fontLoaded && authLoaded) {
                // waiting for 1.571 seconds before removing splashscreen
                // await new Promise((resolve) => setTimeout(resolve, 1571));
                await SplashScreen.hideAsync();
            }
        };

        hideSplashScreen().catch(console.error);
    }, [fontLoaded, authLoaded]);

    return fontLoaded && authLoaded ? (
        <AuthContext.Provider
            value={{
                user: user,
                setUser: setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    ) : (
        <>{null}</>
    );
}

// // old way of doing it (from react-native course)
// export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement {
//     const [fontLoaded] = useFonts({
//         Amiko_400Regular,
//         Amiko_600SemiBold,
//         Amiko_700Bold
//     });

//     return fontLoaded ? <>{children}</> : <AppLoading />;
// }
