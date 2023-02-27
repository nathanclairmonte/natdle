import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";
import React, { ReactElement } from "react";
import AmikoText from "../Text/AmikoText";
import styles from "./MyButton.styles";

type MyButtonProps = {
    title: string;
    loading?: boolean;
} & TouchableOpacityProps;

export default function MyButton({ title, style, loading, ...props }: MyButtonProps): ReactElement {
    return (
        <TouchableOpacity disabled={loading} {...props} style={[styles.button, style]}>
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <AmikoText style={styles.buttonText}>{title}</AmikoText>
            )}
        </TouchableOpacity>
    );
}
