import React, { ReactElement, useRef, useState } from "react";
import { ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAuth } from "@contexts/Auth-context";
import { GradientBackground, MyTextInput, MyButton, AmikoText } from "@components";
import { Auth } from "aws-amplify";
import styles from "./ChangePassword.styles";

export default function ChangePassword(): ReactElement {
    const headerHeight = useHeaderHeight();
    const newPasswordInputRef = useRef<TextInput | null>(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: ""
    });
    const { user } = useAuth();

    // helper function to update the form (exact same function as in Login screen)
    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    // function to call the change password AWS API call
    const changePassword = async () => {
        const { oldPassword, newPassword } = form;
        setLoading(true);
        try {
            await Auth.changePassword(user, oldPassword, newPassword);
            setForm({
                oldPassword: "",
                newPassword: ""
            });
            Alert.alert("Success!", "Password changed successfully!");
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
                    {!user ? (
                        <AmikoText style={styles.instructionsText}>
                            You are not logged in!
                        </AmikoText>
                    ) : (
                        <>
                            <AmikoText style={styles.instructionsText}>
                                Change password for username:{" "}
                                <AmikoText weight="700" style={styles.instructionsText}>
                                    @{user?.username}
                                </AmikoText>
                            </AmikoText>
                            <MyTextInput
                                value={form.oldPassword}
                                onChangeText={(value) => {
                                    setFormInput("oldPassword", value);
                                }}
                                returnKeyType="next"
                                placeholder="Old Password"
                                style={{ marginBottom: 20 }}
                                secureTextEntry={true}
                                onSubmitEditing={() => {
                                    newPasswordInputRef.current?.focus();
                                }}
                            />
                            <MyTextInput
                                value={form.newPassword}
                                onChangeText={(value) => {
                                    setFormInput("newPassword", value);
                                }}
                                ref={newPasswordInputRef}
                                returnKeyType="done"
                                placeholder="New Password"
                                style={{ marginBottom: 30 }}
                                secureTextEntry={true}
                            />
                            <MyButton
                                loading={loading}
                                title="Change Password"
                                onPress={changePassword}
                            />
                        </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </GradientBackground>
    );
}
