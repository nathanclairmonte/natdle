import { View } from "react-native";
import React, { ReactElement } from "react";
import BoardRow from "./BoardRow";
import { BoardState, KeyColours } from "@utils";

type BoardProps = {
    // state -> array containing all guesses so far (max 6 guesses)
    state: BoardState;

    // answer -> the word to be guessed
    answer: string;

    // size -> size of the game board
    size: number;

    //currWord -> the current word being typed out by the user
    currWord: string;

    //keyColours -> the colours to be given to the keyboard keys based on guesses
    keyColours: KeyColours;
};

export default function Board({
    state,
    answer,
    size,
    currWord,
    keyColours
}: BoardProps): ReactElement {
    // add spaces onto the end of currWord (for printing empty tiles)
    for (let i = 0; i < 5 - currWord.length; i++) {
        currWord += " ";
    }

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
                paddingTop: 23
            }}
        >
            {state.map((guess, index) => {
                // make sure we are only typing in first free row
                let typedWord = "     ";
                if (state[index] === null && state[index - 1] !== null) typedWord = currWord;

                return (
                    <BoardRow
                        key={index}
                        guess={guess}
                        answer={answer}
                        boardSize={size}
                        typedWord={typedWord}
                        keyColours={keyColours}
                    />
                );
            })}
        </View>
    );
}
