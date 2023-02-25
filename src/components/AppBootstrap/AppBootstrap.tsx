import { View, Text } from "react-native";
import React, { ReactNode, ReactElement, useEffect } from "react";
// import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import {
    useFonts,
    Amiko_400Regular,
    Amiko_600SemiBold,
    Amiko_700Bold
} from "@expo-google-fonts/amiko";

type AppBootstrapProps = {
    children: ReactNode;
};

// // old way of doing it (from react-native course)
// export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement {
//     const [fontLoaded] = useFonts({
//         Amiko_400Regular,
//         Amiko_600SemiBold,
//         Amiko_700Bold
//     });

//     return fontLoaded ? <>{children}</> : <AppLoading />;
// }

SplashScreen.preventAutoHideAsync();

export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement {
    const [fontLoaded] = useFonts({
        Amiko_400Regular,
        Amiko_600SemiBold,
        Amiko_700Bold
    });

    useEffect(() => {
        const hideSplashScreen = async () => {
            if (fontLoaded) {
                // waiting for 1.571 seconds before removing splashscreen
                await new Promise((resolve) => setTimeout(resolve, 1571));
                await SplashScreen.hideAsync();
            }
        };

        hideSplashScreen().catch(console.error);
    }, [fontLoaded]);

    return fontLoaded ? <>{children}</> : <>{null}</>;
}
