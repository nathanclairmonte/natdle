import { View, Text } from "react-native";
import React, { ReactElement } from "react";
import AmikoText from "../Text/AmikoText";

type TileProps = {
    key: number | string;
    letter: string;
    boardSize: number;
    tileColour: string;
    textColour: string;
    borderWidth: number;
};

export default function Tile({
    letter,
    boardSize,
    tileColour,
    textColour,
    borderWidth
}: TileProps): ReactElement {
    // cast the current letter to uppercase
    letter = letter.toUpperCase();

    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                width: boardSize / 5 - 10,
                height: boardSize / 5 - 10,
                backgroundColor: tileColour,
                marginHorizontal: 4,
                paddingTop: 7,
                borderWidth: borderWidth,
                borderColor: "#555"
            }}
        >
            <AmikoText
                style={{
                    fontSize: boardSize / 9,
                    color: textColour
                }}
            >
                {letter}
            </AmikoText>
        </View>
    );
}
