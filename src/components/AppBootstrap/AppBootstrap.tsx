import { View, Text } from "react-native";
import React, { ReactNode, ReactElement } from "react";
import AppLoading from "expo-app-loading";
import {
    useFonts,
    Amiko_400Regular,
    Amiko_600SemiBold,
    Amiko_700Bold
} from "@expo-google-fonts/amiko";

type AppBootstrapProps = {
    children: ReactNode;
};

export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement {
    const [fontLoaded] = useFonts({
        Amiko_400Regular,
        Amiko_600SemiBold,
        Amiko_700Bold
    });

    return fontLoaded ? <>{children}</> : <AppLoading />;
}
