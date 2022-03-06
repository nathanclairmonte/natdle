import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AppLoading from "expo-app-loading";
import {
    useFonts,
    Amiko_400Regular,
    Amiko_600SemiBold,
    Amiko_700Bold
} from "@expo-google-fonts/amiko";
import { AmikoText } from "@components";

export default function App() {
    const [fontLoaded] = useFonts({
        Amiko_400Regular,
        Amiko_600SemiBold,
        Amiko_700Bold
    });

    if (!fontLoaded) return <AppLoading />;

    return (
        <View style={styles.container}>
            <AmikoText
                onPress={() => {
                    alert(true);
                }}
                style={{ fontSize: 25 }}
                weight="400"
            >
                SLATTTTTTTTTTTT
            </AmikoText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
