import { ScrollView, View, Image } from "react-native";
import React, { ReactElement } from "react";
import styles from "./Home.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/Navigator";
import { GradientBackground, MyButton } from "@components";

type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
    return (
        <GradientBackground theme="fav">
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require("@assets/logo.png")} style={styles.logo} />
                <View style={styles.buttonList}>
                    <MyButton
                        onPress={() => navigation.navigate("SinglePlayerGame")}
                        style={styles.button}
                        title="Single Player"
                    />
                    <MyButton style={styles.button} title="MultiPlayer" />
                    <MyButton
                        onPress={() => navigation.navigate("Login")}
                        style={styles.button}
                        title="Login"
                    />
                    <MyButton
                        onPress={() => navigation.navigate("Settings")}
                        style={styles.button}
                        title="Settings"
                    />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
