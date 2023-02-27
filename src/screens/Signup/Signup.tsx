import React, { ReactElement, useRef, useState } from "react";
import { ScrollView, TextInput, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/Navigator";
import { GradientBackground, MyTextInput, MyButton } from "@components";
import { Auth } from "aws-amplify";
import styles from "./Signup.styles";

type SignupProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, "Signup">;
};

export default function Signup({ navigation }: SignupProps): ReactElement {
    const passwordInputRef = useRef<TextInput | null>(null);
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
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
            Alert.alert("Error!", error.message || "An error has occured!");
        }
        setLoading(false);
    };

    // const tempCreateSingleUser = async () => {
    //     try {
    //         const res = await Auth.signUp({
    //             username: "test",
    //             password: "12345678",
    //             attributes: {
    //                 email: "test@test.com",
    //                 name: "Mr. Test"
    //             }
    //         });
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

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
                <MyButton loading={loading} title="Login" onPress={login} />
            </ScrollView>
        </GradientBackground>
    );
}
