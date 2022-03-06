import React, { ReactElement } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AmikoText, AppBootstrap } from "@components";

export default function App(): ReactElement {
    return (
        <AppBootstrap>
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
        </AppBootstrap>
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
