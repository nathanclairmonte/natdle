import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Amiko_400Regular } from "@expo-google-fonts/amiko";

export default function App() {
    const [fontLoaded] = useFonts({
        Amiko_400Regular
    });

    if (!fontLoaded) return <AppLoading />;

    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 25,
                    fontFamily: "Amiko_400Regular"
                }}
            >
                SLATTTTTTTT
            </Text>
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
