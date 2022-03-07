import { View, Text } from "react-native";
import React, { ReactElement } from "react";
import Tile from "./Tile";

type BoardRowProps = {
    key: number | string;
    guess: string;
    answer: string;
    boardSize: number;
};

export default function BoardRow({ guess, answer, boardSize }: BoardRowProps): ReactElement {
    const tileColours: string[] = [];
    const textColours: string[] = [];
    const bWidths: number[] = [];
    const answerArr = answer.split("");

    // const guessCheck = "culcs";
    // if (guess === guessCheck) console.log("------------------------------------------------------");

    for (let i = 0; i < 5; i++) {
        let keepLetter = false;
        const letter = guess[i];

        // get position of guessed letter in answer
        const letterPos = answerArr.indexOf(letter);

        // letter is not in answer at all, set to grey
        if (letterPos === -1) {
            tileColours.push("#787c7f"); // grey
            textColours.push("#fff");
            bWidths.push(0);
        }

        // letter is in answer
        else {
            // letter is in correct position, set to green
            if (letter === answer[i]) {
                tileColours.push("#6baa64"); // green
                textColours.push("#fff");
                bWidths.push(0);
            }

            // letter is not in correct position
            else {
                // find how many times letter exists in answer
                const numInAnswer = answer
                    .split("")
                    .map((l, idx) => (l == letter ? idx : -1))
                    .filter((idx) => idx !== -1).length;

                // find how many times letter was guessed correctly
                const numCorrectlyGuessed = guess
                    .split("")
                    .map((l, idx) => (l === letter && l === answer[idx] ? idx : -1))
                    .filter((idx) => idx !== -1).length;

                // if (guess === guessCheck) {
                //     console.log(`current letter: ${letter}`);
                //     console.log(`num in answer: ${numInAnswer}`);
                //     console.log(`num corr guessed: ${numCorrectlyGuessed}\n`);
                // }

                // still more of letter to be correctly guessed, set to yellow
                if (numInAnswer - numCorrectlyGuessed > 0) {
                    tileColours.push("#c9b457"); // yellow
                    textColours.push("#fff");
                    bWidths.push(0);
                }

                // no more of letter to be correctly guessed, set to grey
                else {
                    tileColours.push("#787c7f"); // grey
                    textColours.push("#fff");
                    bWidths.push(0);
                    keepLetter = true;
                }
            }

            // remove correct letter from answerArr to handle duplicates
            if (!keepLetter) answerArr[letterPos] = "#";
            // if (guess === guessCheck) {
            //     console.log(keepLetter);
            //     console.log(answerArr);
            // }
        }
    }

    return (
        <View
            style={{
                flexDirection: "row",
                paddingVertical: 4
            }}
        >
            {guess.split("").map((letter, index) => {
                return (
                    <Tile
                        key={index}
                        letter={letter}
                        letterIndex={index}
                        boardSize={boardSize}
                        answer={answer}
                        tileColour={tileColours[index]}
                        textColour={textColours[index]}
                        borderWidth={bWidths[index]}
                    />
                );
            })}
        </View>
    );
}
