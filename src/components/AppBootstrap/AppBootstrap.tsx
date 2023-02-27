import { View, Text } from "react-native";
import React, { ReactNode, ReactElement, useEffect, useState } from "react";
// import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import {
    useFonts,
    Amiko_400Regular,
    Amiko_600SemiBold,
    Amiko_700Bold
} from "@expo-google-fonts/amiko";
import { Auth, Hub } from "aws-amplify";
import { useAuth } from "@contexts/Auth-context";

type AppBootstrapProps = {
    children: ReactNode;
};

SplashScreen.preventAutoHideAsync();

export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement {
    const [fontLoaded] = useFonts({
        Amiko_400Regular,
        Amiko_600SemiBold,
        Amiko_700Bold
    });
    const [authLoaded, setAuthLoaded] = useState(false);
    const { setUser } = useAuth();

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

        // function to listen to aws Hub for sign out activity
        // putting it here bc this useEffect will run only once, and we want the listener
        // to be run only once as well. Putting it inside AppBootstrap bc it will already be
        // rendered by the time we want to listen for sign out activity.
        const hubListener = (hubData: any) => {
            // function that will be run when the listener fires an event
            const { data, event } = hubData.payload;
            switch (event) {
                case "signOut":
                    setUser(null);
                    break;
                case "signIn":
                    setUser(data);
                    break;
                default:
                    break;
            }
        };
        Hub.listen("auth", hubListener);

        // also want to unsubscribe from the listener when the component unmounts
        // we can do this by passing a function to the return of useEffect
        // as per useEffect functionality, this function will run when comp unmounts
        return () => {
            Hub.remove("auth", hubListener);
        };
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

    return fontLoaded && authLoaded ? <>{children}</> : <>{null}</>;
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
