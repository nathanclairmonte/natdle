import { View, Button } from "react-native";
import React, { ReactElement } from "react";
import styles from "./home.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/Navigator";
import { AmikoText } from "@components";

type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
    return (
        <View style={styles.container}>
            <AmikoText style={{ fontSize: 25 }}>Home</AmikoText>
            <Button
                title="Game"
                onPress={() => {
                    navigation.navigate("Game", { gameId: "test" });
                }}
            />
        </View>
    );
}
