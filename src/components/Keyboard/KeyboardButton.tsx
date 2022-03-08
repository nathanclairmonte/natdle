import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { ReactElement } from "react";
import AmikoText from "../Text/AmikoText";

type KeyboardButtonProps = {
    symbol: string;
    boardSize: number;
    onKeyPressed: (symbol: string) => void;
} & TouchableOpacityProps;

export default function KeyboardButton({
    symbol,
    boardSize,
    onKeyPressed,
    ...props
}: KeyboardButtonProps): ReactElement {
    let buttonColour;
    let buttonWidth;
    if (symbol.toLowerCase() === "del") {
        buttonColour = "red";
        buttonWidth = boardSize / 8; // 43 if boardSize is 340
    } else if (symbol.toLowerCase() === "submit") {
        buttonColour = "#000";
        buttonWidth = boardSize / 2;
    } else {
        buttonColour = "#000";
        buttonWidth = boardSize / 11 + 2; // 33 if boardSize is 340
    }

    return (
        <TouchableOpacity
            {...props}
            onPress={() => onKeyPressed && onKeyPressed(symbol)}
            style={{
                alignItems: "center",
                justifyContent: "center",
                width: buttonWidth,
                height: boardSize / 6, // 57 if boardSize is 340
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
