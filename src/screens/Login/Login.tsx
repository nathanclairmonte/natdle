import React, { ReactElement, useRef, useState } from "react";
import { ScrollView, TextInput, Alert, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/Navigator";
import { GradientBackground, MyTextInput, MyButton, AmikoText } from "@components";
import { Auth } from "aws-amplify";
import styles from "./Login.styles";

type LoginProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, "Login">;
};

export default function Login({ navigation }: LoginProps): ReactElement {
    const passwordInputRef = useRef<TextInput | null>(null);
    const [form, setForm] = useState({
        username: "test",
        password: "12345678"
    });
    const [loading, setLoading] = useState(false);

    // helper function to update the form
    // also, the below function has "keyof typeof form" which is a way of getting the
    // keys of the form object and using them as types for this key variable
    // in the actual function i've left that way of doing it, but the line
    // directly below here (commented out) is the more readable version
    // const setFormInput = (key: "username" | "password", value: string) => {
    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const login = async () => {
        setLoading(true);
        // call cognito api
        const { username, password } = form;
        try {
            await Auth.signIn(username, password);
            navigation.navigate("Home");
        } catch (error) {
            if (error.code === "UserNotConfirmedException") {
                navigation.navigate("Signup", { username: username });
            } else {
                Alert.alert("Error!", error.message || "An error has occured!");
            }
        }
        setLoading(false);
    };

    return (
        <GradientBackground theme="spring">
            <ScrollView contentContainerStyle={styles.container}>
                <MyTextInput
                    value={form.username}
                    onChangeText={(value) => {
                        setFormInput("username", value);
                    }}
                    returnKeyType="next"
                    placeholder="Username"
                    style={{ marginBottom: 20 }}
                    onSubmitEditing={() => {
                        passwordInputRef.current?.focus();
                    }}
                />
                <MyTextInput
                    value={form.password}
                    onChangeText={(value) => {
                        setFormInput("password", value);
                    }}
                    ref={passwordInputRef}
                    returnKeyType="done"
                    placeholder="Password"
                    style={{ marginBottom: 30 }}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <AmikoText style={styles.forgotPasswordLink}>Forgot password?</AmikoText>
                </TouchableOpacity>
                <MyButton loading={loading} title="Login" onPress={login} />

                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <AmikoText style={styles.signupLink}>Don&apos;t have an account?</AmikoText>
                </TouchableOpacity>
            </ScrollView>
        </GradientBackground>
    );
}
