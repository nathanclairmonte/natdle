import { Text, TextProps } from "react-native";
import React, { ReactElement } from "react";

type AmikoTextProps = {
    weight?: "400" | "600" | "700";
} & TextProps;

const defaultProps = {
    weight: "400"
};

export default function AmikoText({
    children,
    style,
    weight,
    ...props
}: AmikoTextProps): ReactElement {
    let fontFamily;
    if (weight === "400") fontFamily = "Amiko_400Regular";
    else if (weight === "600") fontFamily = "Amiko_600SemiBold";
    else if (weight === "700") fontFamily = "Amiko_700Bold";
    // else if (!weight) fontFamily = "Amiko_400Regular"; // default to 400 if no weight passed

    return (
        <Text {...props} style={[{ fontFamily }, style]}>
            {children}
        </Text>
    );
}

AmikoText.defaultProps = defaultProps;
