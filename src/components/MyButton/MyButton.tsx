import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { ReactElement } from "react";
import AmikoText from "../Text/AmikoText";
import styles from "./MyButton.styles";

type MyButtonProps = {
    title: string;
} & TouchableOpacityProps;

export default function MyButton({ title, style, ...props }: MyButtonProps): ReactElement {
    return (
        <TouchableOpacity {...props} style={[styles.button, style]}>
            <AmikoText style={styles.buttonText}>{title}</AmikoText>
        </TouchableOpacity>
    );
}
