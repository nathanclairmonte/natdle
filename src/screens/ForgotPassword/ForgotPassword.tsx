import React, { ReactElement, useRef, useState } from "react";
import { ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useHeaderHeight } from "@react-navigation/elements";
import { StackNavigatorParams } from "@config/Navigator";
import { GradientBackground, MyTextInput, MyButton, AmikoText } from "@components";
import { Auth } from "aws-amplify";
import styles from "./ForgotPassword.styles";

type ForgotPasswordProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, "ForgotPassword">;
};

export default function ForgotPassword({ navigation }: ForgotPasswordProps): ReactElement {
    const headerHeight = useHeaderHeight();
    const passwordInputRef = useRef<TextInput | null>(null);
    const [form, setForm] = useState({
        username: "",
        newPassword: "",
        code: ""
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<"1" | "2">("1");

    // helper function to update the form (exact same function as in Login screen)
    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    // function to call the forgot password AWS API call
    const forgotPassword = async () => {
        const { username } = form;
        setLoading(true);
        try {
            await Auth.forgotPassword(username);
            setStep("2");
        } catch (error) {
            Alert.alert("Error!", error.message || "An error has occured!");
        }
        setLoading(false);
    };

    // function to call the forgotPasswordSubmit AWS API call
    const resetPassword = async () => {
        const { username, newPassword, code } = form;
        setLoading(true);
        try {
            await Auth.forgotPasswordSubmit(username, code, newPassword);
            Alert.alert("Success!", "Password changed successfully!");
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert("Error!", error.message || "An error has occured!");
        }
        setLoading(false);
    };

    return (
        <GradientBackground theme="spring">
            <KeyboardAvoidingView
                keyboardVerticalOffset={headerHeight}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    {step === "1" && (
                        <>
                            <AmikoText style={styles.instructionsText}>
                                Please enter your username
                            </AmikoText>
                            <MyTextInput
                                value={form.username}
                                onChangeText={(value) => {
                                    setFormInput("username", value);
                                }}
                                returnKeyType="next"
                                placeholder="Username"
                                style={{ marginBottom: 20 }}
                            />
                        </>
                    )}

                    {step === "2" && (
                        <>
                            <AmikoText style={styles.instructionsText}>
                                Please enter the code you received in your email and your desired
                                new password
                            </AmikoText>
                            <MyTextInput
                                value={form.code}
                                onChangeText={(value) => {
                                    setFormInput("code", value);
                                }}
                                returnKeyType="next"
                                placeholder="Verification Code"
                                style={{ marginBottom: 20 }}
                                keyboardType="numeric"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <MyTextInput
                                value={form.newPassword}
                                onChangeText={(value) => {
                                    setFormInput("newPassword", value);
                                }}
                                ref={passwordInputRef}
                                returnKeyType="done"
                                placeholder="New Password"
                                style={{ marginBottom: 30 }}
                                secureTextEntry={true}
                            />
                        </>
                    )}

                    <MyButton
                        loading={loading}
                        title="Submit"
                        onPress={() => {
                            if (step === "1") {
                                forgotPassword();
                            }
                            if (step === "2") {
                                resetPassword();
                            }
                        }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </GradientBackground>
    );
}
