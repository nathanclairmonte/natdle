import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { ReactElement } from "react";
import AmikoText from "../Text/AmikoText";

type KeyboardButtonProps = {
    symbol: string;
    onKeyPressed: (symbol: string) => void;
    buttonColour: string;
    buttonWidth: number;
    keyHeight: number;
} & TouchableOpacityProps;

export default function KeyboardButton({
    symbol,
    onKeyPressed,
    buttonColour,
    buttonWidth,
    keyHeight,
    ...props
}: KeyboardButtonProps): ReactElement {
    return (
        <TouchableOpacity
            {...props}
            onPress={() => onKeyPressed && onKeyPressed(symbol)}
            style={{
                alignItems: "center",
                justifyContent: "center",
                width: buttonWidth,
                height: keyHeight,
                backgroundColor: buttonColour,
                marginHorizontal: 2,
                paddingVertical: 10,
                borderRadius: 5,
                paddingTop: 12
            }}
        >
            <AmikoText style={{ fontSize: 18, color: "#fff" }}>{symbol.toUpperCase()}</AmikoText>
        </TouchableOpacity>
    );
}
