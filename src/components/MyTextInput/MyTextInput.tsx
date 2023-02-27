import { View, Text } from "react-native";
import React, { ReactElement, forwardRef } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

const styles = StyleSheet.create({
    textInput: {
        height: 55,
        width: "100%",
        borderWidth: 2,
        borderRadius: 3,
        borderColor: "#6ECBD5",
        backgroundColor: "#FFE3FF",
        padding: 10,
        paddingTop: 14,
        fontFamily: "Amiko_400Regular",
        fontSize: 20
    }
});

const MyTextInput = forwardRef<TextInput, TextInputProps>(
    ({ style, ...props }, ref): ReactElement => (
        <TextInput
            // placeholderTextColor="#5d5379"
            ref={ref}
            style={[styles.textInput, style]}
            {...props}
        />
    )
);

MyTextInput.displayName = "MyTextInput";

export default MyTextInput;
