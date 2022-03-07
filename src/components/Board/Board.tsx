import { View, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import AmikoText from "../Text/AmikoText";
import BoardRow from "./BoardRow";

type BoardProps = {
    // state -> array containing all guesses so far (max 6 guesses)
    state: [string, string, string, string, string, string];

    // answer -> the word to be guessed
    answer: string;

    // size -> size of the game board
    size: number;
};

export default function Board({ state, answer, size }: BoardProps): ReactElement {
    return (
        <View
            style={{
                width: size,
                height: size,
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                alignSelf: "center",
                justifyContent: "center",
                paddingTop: 23,
                borderWidth: 2
            }}
        >
            {state.map((cell, index) => {
                return <BoardRow key={index} word={cell} answer={answer} boardSize={size} />;
            })}
        </View>
    );
}
