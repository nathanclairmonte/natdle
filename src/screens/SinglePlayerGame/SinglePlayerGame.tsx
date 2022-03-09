import { SafeAreaView } from "react-native";
import React, { ReactElement, useState } from "react";
import styles from "./SinglePlayerGame.styles";
import { GradientBackground, Board, Keyboard } from "@components";
import { Guess, BoardState, KeyColours, answersEasy, allowedGuesses, ThemeOptions } from "@utils";

const themeOptions: ThemeOptions = ["fav", "burple", "spring", "frozen"];

export default function SinglePlayerGame(): ReactElement {
    // initialization variables
    const boardSize = 340;
    const startState: BoardState = [null, null, null, null, null, null];
    // const answer = "hoard";
    // const answer = "slatt";
    // const answer = answersEasy[Math.floor(Math.random() * answersEasy.length)];

    // pieces of state
    const [theme, setTheme] = useState(
        themeOptions[Math.floor(Math.random() * themeOptions.length)]
    );
    const [state, setState] = useState(startState); // state of the board
    const [answer, setAnswer] = useState(
        answersEasy[Math.floor(Math.random() * answersEasy.length)]
    );
    const [currWord, setCurrWord] = useState(""); // used for typing letters in
    const [submitText, setSubmitText] = useState("SUBMIT");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    // defining colours as variables for readiblity
    const black = "#000";
    const red = "red";
    const grey = "#787c7f";

    // defining strings for the submit and delete key labels
    const delString = "DEL";
    const submitString = "SUBMIT";
    const notWordString = "Not a word :(";

    // used to set key colours based on letters used/available
    // prettier-ignore
    const [keyColours, setKeyColours] = useState({
        Q: black, W: black, E: black, R: black, T: black, Y: black, U: black, I: black, O: black, P: black,
        A: black, S: black, D: black, F: black, G: black, H: black, J: black, K: black, L: black,
        Z: black, X: black, C: black, V: black, B: black, N: black, M: black, SUBMIT: black, DEL: red
    } as KeyColours);

    // onKeyPressed function
    const onKeyPressed = (symbol: string): void => {
        if (symbol === delString) {
            // revert submit button colour + text if currWord is.length is 5 and not a word
            // this is because deleting a letter should remove the not a word text
            if (currWord.length === 5 && !allowedGuesses.includes(currWord)) {
                // change submit button text to SUBMIT
                setSubmitText(submitString);

                // change submit button colour to black
                const newKeyColours: KeyColours = {};
                for (const i in keyColours) {
                    newKeyColours[i] = i === submitString ? black : keyColours[i];
                }
                setKeyColours(newKeyColours);

                // re-enable submit button
                setIsSubmitDisabled(false);
            }

            // remove last character from currWord
            setCurrWord(currWord.slice(0, -1));
        } else if (currWord.length === 5) {
            if (symbol == submitString) {
                // check if guessed word is acceptable
                // add guessed word to the state
                const nextEmptyIdx = state.indexOf(null);
                const newState = state.map((guess, idx) => {
                    return idx === nextEmptyIdx ? (currWord as Guess) : guess;
                });
                setState(newState as BoardState);
                setCurrWord("");
            } else {
                // word maxed out, do nothing
                return;
            }
        } else if (symbol !== delString && symbol !== submitString) {
            // check if currWord is 4 letters before adding symbol
            // if it is, check validity of 5-letter word after adding symbol
            if (currWord.length === 4) {
                const temp = currWord.slice() + symbol.toLowerCase();
                if (!allowedGuesses.includes(temp)) {
                    // change submit button text to 'not a word'
                    setSubmitText(notWordString);

                    // change submit button colour to grey
                    const newKeyColours: KeyColours = {};
                    for (const i in keyColours) {
                        newKeyColours[i] = i === submitText ? grey : keyColours[i];
                    }
                    setKeyColours(newKeyColours);

                    // disable submit button
                    setIsSubmitDisabled(true);
                } else {
                    // change submit button text to SUBMIT
                    setSubmitText(submitString);

                    // change submit button colour to black
                    const newKeyColours: KeyColours = {};
                    for (const i in keyColours) {
                        newKeyColours[i] = i === submitText ? black : keyColours[i];
                    }
                    setKeyColours(newKeyColours);

                    // re-enable submit button
                    setIsSubmitDisabled(false);
                }
            }

            // add character to currWord
            setCurrWord(currWord + symbol.toLowerCase());
        }
    };

    return (
        <GradientBackground theme={theme}>
            <SafeAreaView style={styles.container}>
                <Board
                    state={state}
                    answer={answer}
                    size={boardSize}
                    currWord={currWord}
                    keyColours={keyColours}
                />
                <Keyboard
                    onKeyPressed={(symbol) => onKeyPressed(symbol)}
                    boardSize={boardSize}
                    keyColours={keyColours}
                    submitText={submitText}
                    isSubmitDisabled={isSubmitDisabled}
                />
            </SafeAreaView>
        </GradientBackground>
    );
}
