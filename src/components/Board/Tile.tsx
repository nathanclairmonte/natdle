import { View, Text } from "react-native";
import React, { ReactElement } from "react";
import AmikoText from "../Text/AmikoText";

type TileProps = {
    key: number | string;
    letter: string;
    letterIndex: number;
    boardSize: number;
    answer: string;
};

export default function Tile({ letter, letterIndex, boardSize, answer }: TileProps): ReactElement {
    // cast the current letter and Natdle answer to uppercase
    letter = letter.toUpperCase();
    answer = answer.toUpperCase();

    // set tile colour based on regular wordle rules
    let tileColour;
    let bWidth;
    if (answer[letterIndex] === letter) {
        tileColour = "#6baa64"; // green
        bWidth = 0;
    } else if (answer.includes(letter)) {
        tileColour = "#c9b457"; // yellow
        bWidth = 0;
    } else if (letter == " ") {
        tileColour = "#fff"; // white (no letter)
        bWidth = 2;
    } else {
        tileColour = "#787c7f"; // grey
        bWidth = 0;
    }

    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                width: boardSize / 5 - 10,
                height: boardSize / 5 - 10,
                backgroundColor: tileColour,
                marginHorizontal: 4,
                paddingTop: 5,
                borderWidth: bWidth,
                borderColor: "#555"
            }}
        >
            <AmikoText
                style={{
                    fontSize: boardSize / 8,
                    color: "#fff"
                }}
            >
                {letter}
            </AmikoText>
        </View>
    );
}
