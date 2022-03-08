import { View } from "react-native";
import React, { ReactElement } from "react";
import Tile from "./Tile";
import { Guess, KeyColours } from "@utils";

type BoardRowProps = {
    key: number | string;
    guess: Guess;
    answer: string;
    boardSize: number;
    typedWord: string;
    keyColours: KeyColours;
};

export default function BoardRow({
    guess,
    answer,
    boardSize,
    typedWord,
    keyColours
}: BoardRowProps): ReactElement {
    // defining colours as variables to make code more readable
    const black = "#000";
    const white = "#fff";
    const green = "#6baa64";
    const grey = "#787c7f";
    const yellow = "#c9b457";

    // variables to help with colouring a row
    const tileColours: string[] = [];
    const textColours: string[] = [];
    const bWidths: number[] = [];
    const answerArr = answer.split("");

    // variables to track which keyboard letters should change colour
    const greenLetters: string[] = [];
    const greyLetters: string[] = [];

    // const guessCheck = "culcs";
    // if (guess === guessCheck) console.log("------------------------------------------------------");

    // guess is null, make the row empty
    if (!guess) {
        for (let i = 0; i < 5; i++) {
            tileColours.push(white);
            textColours.push(black);
            bWidths.push(2);
        }
    }

    // guess is not null, colour according to wordle rules
    else {
        for (let i = 0; i < 5; i++) {
            let keepLetter = false;
            const letter = guess[i];

            // get position of guessed letter in answer
            const letterPos = answerArr.indexOf(letter);

            // letter is not in answer at all, set to grey
            if (letterPos === -1) {
                tileColours.push(grey);
                textColours.push(white);
                bWidths.push(0);
                for (const i in keyColours) {
                    if (i === letter) keyColours[i] = grey;
                }
            }

            // letter is in answer
            else {
                // letter is in correct position, set to green
                if (letter === answer[i]) {
                    tileColours.push(green);
                    textColours.push(white);
                    bWidths.push(0);
                    for (const i in keyColours) {
                        if (i === letter) keyColours[i] = green;
                    }
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
                        tileColours.push(yellow);
                        textColours.push(white);
                        bWidths.push(0);
                    }

                    // no more of letter to be correctly guessed, set to grey
                    else {
                        tileColours.push(grey);
                        textColours.push(white);
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
    }

    return (
        <View
            style={{
                flexDirection: "row",
                paddingVertical: 4
            }}
        >
            {tileColours.map((_, index) => {
                return (
                    <Tile
                        key={index}
                        letter={guess ? guess[index] : typedWord[index]}
                        boardSize={boardSize}
                        tileColour={tileColours[index]}
                        textColour={textColours[index]}
                        borderWidth={bWidths[index]}
                    />
                );
            })}
        </View>
    );
}
