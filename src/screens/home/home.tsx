import { ScrollView, View, Image, Alert } from "react-native";
import React, { ReactElement, useState } from "react";
import styles from "./Home.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/Navigator";
import { GradientBackground, MyButton, AmikoText } from "@components";
import { useAuth } from "@contexts/Auth-context";
import { Auth } from "aws-amplify";

type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
    const { user } = useAuth();
    const [signingOut, setSigningOut] = useState(false);

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
                        loading={signingOut}
                        onPress={async () => {
                            if (user) {
                                //logout
                                setSigningOut(true);
                                try {
                                    await Auth.signOut();
                                } catch (error) {
                                    Alert.alert("Error!", "Error signing out.");
                                }
                                setSigningOut(false);
                            } else {
                                // go to login screen
                                navigation.navigate("Login");
                            }
                        }}
                        style={styles.button}
                        title={user ? "Logout" : "Login"}
                    />
                    <MyButton
                        onPress={() => navigation.navigate("Settings")}
                        style={styles.button}
                        title="Settings"
                    />

                    {user && (
                        <AmikoText weight="400" style={styles.loggedInText}>
                            Logged in as <AmikoText weight="700">@{user.username}</AmikoText>
                        </AmikoText>
                    )}
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
