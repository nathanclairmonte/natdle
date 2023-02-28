import React, { ReactElement, useRef, useState } from "react";
import {
    ScrollView,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useHeaderHeight } from "@react-navigation/elements";
import { StackNavigatorParams } from "@config/Navigator";
import { GradientBackground, MyTextInput, MyButton, AmikoText } from "@components";
import { Auth } from "aws-amplify";
import OTPInput from "@twotalltotems/react-native-otp-input";
import styles from "./Signup.styles";

type SignupProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, "Signup">;
};

export default function Signup({ navigation }: SignupProps): ReactElement {
    const headerHeight = useHeaderHeight();
    const usernameInputRef = useRef<TextInput | null>(null);
    const emailInputRef = useRef<TextInput | null>(null);
    const passwordInputRef = useRef<TextInput | null>(null);
    const [form, setForm] = useState({
        name: "Test Name",
        username: "test2",
        email: "faheem80@formsphk.com",
        password: "12345678"
    });
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [step, setStep] = useState<"signup" | "otp">("signup");

    // helper function to update the form (exact same function as in Login screen)
    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    // signup function. calls the AWS api to register a new user
    const signup = async () => {
        // set loading state to true (to disable button)
        setLoading(true);

        // get form info
        const { name, username, email, password } = form;

        // call AWS api to register new user
        try {
            await Auth.signUp({
                username: username,
                password: password,
                attributes: {
                    email: email,
                    name: name
                }
            });
            setStep("otp");
        } catch (error) {
            Alert.alert("Error!", error.message || "An error has occured!");
        }

        // set loading state to false (re-enable button)
        setLoading(false);
    };

    // function to confirm a user using the emailed code
    const confirm = async (code: string) => {
        setOtpLoading(true);
        try {
            await Auth.confirmSignUp(form.username, code);
            navigation.navigate("Login");
            Alert.alert("Success!", "You can now login");
        } catch (error) {
            Alert.alert("Error!", error.message || "An error has occured!");
        }
        setOtpLoading(false);
    };

    return (
        <GradientBackground theme="spring">
            <KeyboardAvoidingView
                keyboardVerticalOffset={headerHeight}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    {step === "otp" && (
                        <>
                            <AmikoText style={styles.otpText}>
                                Please enter the confirmation code that you received via email
                            </AmikoText>
                            {otpLoading ? (
                                <ActivityIndicator color="black" />
                            ) : (
                                <OTPInput
                                    pinCount={6}
                                    placeholderTextColor="#5d5379"
                                    codeInputFieldStyle={styles.otpInputBox}
                                    codeInputHighlightStyle={styles.otpActiveInputBox}
                                    onCodeFilled={(code) => {
                                        confirm(code);
                                    }}
                                />
                            )}
                        </>
                    )}

                    {step === "signup" && (
                        <>
                            <MyTextInput
                                value={form.name}
                                onChangeText={(value) => {
                                    setFormInput("name", value);
                                }}
                                returnKeyType="next"
                                placeholder="Name"
                                style={{ marginBottom: 20 }}
                                onSubmitEditing={() => {
                                    usernameInputRef.current?.focus();
                                }}
                            />
                            <MyTextInput
                                value={form.username}
                                onChangeText={(value) => {
                                    setFormInput("username", value);
                                }}
                                ref={usernameInputRef}
                                returnKeyType="next"
                                placeholder="Username"
                                style={{ marginBottom: 20 }}
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />
                            <MyTextInput
                                keyboardType="email-address"
                                value={form.email}
                                onChangeText={(value) => {
                                    setFormInput("email", value);
                                }}
                                ref={emailInputRef}
                                returnKeyType="next"
                                placeholder="Email"
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
                            <MyButton loading={loading} title="Sign Up" onPress={signup} />
                        </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </GradientBackground>
    );
}
