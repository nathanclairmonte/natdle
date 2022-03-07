import { View, Text } from "react-native";
import React, { ReactElement } from "react";
import Tile from "./Tile";

type BoardRowProps = {
    key: number | string;
    word: string;
    answer: string;
    boardSize: number;
};

export default function BoardRow({ word, answer, boardSize }: BoardRowProps): ReactElement {
    return (
        <View
            style={{
                flexDirection: "row",
                paddingVertical: 4,
                marginLeft: 5
            }}
        >
            {word.split("").map((letter, index) => {
                return (
                    <Tile
                        key={index}
                        letter={letter}
                        letterIndex={index}
                        boardSize={boardSize}
                        answer={answer}
                    />
                );
            })}
        </View>
    );
}
